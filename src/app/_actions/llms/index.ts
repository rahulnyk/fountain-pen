import { ChatCompletion } from "openai/resources/index.mjs";
import { Embeddings, EmbeddingsParams } from "@langchain/core/embeddings";
import { readEnvProperty } from "../helpers/read_env_properties";
import { OpenAI } from "openai";
import { OpenAIEmbeddings } from "@langchain/openai";
import { WalmartEmbeddings } from "./llm-gateway/walmart_embeddings";
import { wmChatCompletions } from "./llm-gateway/walmart_llm";

type llmChatCompletion = (body: any) => Promise<ChatCompletion>

// type llmProvider = {
//     chatCompletion: llmChatCompletion,
//     embeddingFunction: Embeddings
// }

type llmProvider = [llmChatCompletion, Embeddings]

export function LLMProvider(): llmProvider {
    const LLM_PROVIDER = readEnvProperty('LLM_PROVIDER', true)
    switch (LLM_PROVIDER) {
        case 'openai': {
            // Check if the key exist in the env file
            const OPENAI_API_KEY = readEnvProperty('OPENAI_API_KEY', true)
            const openai = new OpenAI() // Initialize OpenAI with your API key
            const embeddingFunction = new OpenAIEmbeddings({
                openAIApiKey: process.env.OPENAI_API_KEY,
            });
            return [
                openai.chat.completions.create,
                embeddingFunction,
            ]
        }
        case 'walmart': {
            // Check if Walmart API key exist. This works only within WM VPN
            const WALMART_API_KEY = readEnvProperty('WALMART_API_KEY', true)
            const embeddingParams: EmbeddingsParams = {
                maxConcurrency: 1,
                maxRetries: 2
            };
            const embeddingFunction = new WalmartEmbeddings(embeddingParams)
            return [
                wmChatCompletions,
                embeddingFunction,
            ]
        }
        default: {
            throw new Error("Please set one of the known LLM_PROVIDER in your env file. Known values are 'openai' and 'walmart'")
        }
    }
}