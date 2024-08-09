import axios, { AxiosResponse } from "axios";
import { Embeddings, EmbeddingsParams } from "@langchain/core/embeddings";
import { readEnvProperty } from "../helpers/read_env_properties";
import crypto from "crypto";
import { ChatCompletion } from "openai/resources/index.mjs";

export async function orgChatCompletions(body: any): Promise<ChatCompletion> {
    const requestBody = {
        model: body.model,
        task: "chat/completions",
        "api-version": readEnvProperty("ORG_GATEWAY_API_VERSION", true),
        "model-version": readEnvProperty("ORG_GATEWAY_MODEL_VERSION", true),
        "model-params": {
            messages: body.messages,
        },
    };
    const headers = getHeaders();
    let choices: ChatCompletion;
    const res = await axios.post(
        readEnvProperty("ORG_GATEWAY_BASEURL", true),
        requestBody,
        { headers: headers }
    );
    choices = res.data;
    return choices;
}


export class OrgEmbeddings extends Embeddings {
    constructor(params?: EmbeddingsParams) {
        const embeddingParams = params ? params : {};
        super(embeddingParams); // call the parent constructor
    }

    async embedDocuments(documents: string[]): Promise<number[][]> {
        const result = await this.OrgGatewayCall(documents);
        return result;
    }

    async embedQuery(document: string): Promise<number[]> {
        const result = await this.OrgGatewayCall(document);
        return result[0];
    }

    async OrgGatewayCall(docs: any): Promise<number[][]> {
        const headers = getHeaders();
        const gatewayBaseUrl = readEnvProperty("ORG_GATEWAY_BASEURL", true);
        const payload = {
            model: "text-embedding-ada-002",
            "api-version": "2024-06-01",
            "model-version": "2",
            task: "embeddings",
            "model-params": { input: docs },
        };

        try {
            let embed_docs_list: number[][] = [];
            const response: AxiosResponse = await axios.post(
                gatewayBaseUrl,
                payload,
                { headers: headers }
            );
            for (let embedding_object of response.data.data) {
                embed_docs_list.push(embedding_object.embedding);
            }
            return embed_docs_list;
        } catch (e: any) {
            console.log("LLM Gateway API call success");
            throw new Error(
                `Error while calling LLM Gateway API call: ${e?.message}`
            );
        }
    }
}


interface ServiceRegistrySignature {
    signature: string;
    timestamp: string;
}

function getHeaders() {
    const headers = { "x-api-key": readEnvProperty("ORG_API_KEY", true) };

    if (!headers["x-api-key"]) {
        throw new Error(
            "Missing required environment variables ORG_API_KEY. This is required for request header."
        );
    }
    return headers;
}
