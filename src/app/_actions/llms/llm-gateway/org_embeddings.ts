import axios, { AxiosResponse } from "axios";
import { Embeddings, EmbeddingsParams } from "@langchain/core/embeddings";
import { getHeaders } from "./utils";
import { readEnvProperty } from "../../helpers/read_env_properties";

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
