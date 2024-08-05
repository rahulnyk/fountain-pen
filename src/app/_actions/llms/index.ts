import { ChatCompletion } from "openai/resources/index.mjs";
import { Embeddings, EmbeddingsParams } from "@langchain/core/embeddings";
import { readEnvProperty } from "../helpers/read_env_properties";
import { OpenAI } from "openai";
import { OpenAIEmbeddings } from "@langchain/openai";
import { OrgEmbeddings } from "./llm-gateway/org_embeddings";
import { orgChatCompletions } from "./llm-gateway/org_llm";

type llmChatCompletion = (body: any) => Promise<ChatCompletion>;

// type llmProvider = {
//     chatCompletion: llmChatCompletion,
//     embeddingFunction: Embeddings
// }

type llmProvider = [llmChatCompletion, Embeddings];

export function LLMProvider(): llmProvider {
    const LLM_PROVIDER = readEnvProperty("LLM_PROVIDER", true);
    switch (LLM_PROVIDER) {
        case "openai": {
            const openai = new OpenAI();
            const embeddingFunction = new OpenAIEmbeddings({
                openAIApiKey: process.env.OPENAI_API_KEY,
            });
            return [
                openai.chat.completions.create.bind(openai.chat.completions),
                embeddingFunction,
            ];
        }
        case "org": {
            const embeddingParams: EmbeddingsParams = {
                maxConcurrency: 1,
                maxRetries: 2,
            };
            const embeddingFunction = new OrgEmbeddings(embeddingParams);
            return [orgChatCompletions, embeddingFunction];
        }
        default: {
            throw new Error(
                "Please set one of the known LLM_PROVIDER in your env file. Known values are 'openai' and 'org'"
            );
        }
    }
}
