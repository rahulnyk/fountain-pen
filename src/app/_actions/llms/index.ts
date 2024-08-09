import { ChatCompletion } from "openai/resources/index.mjs";
import { Embeddings } from "@langchain/core/embeddings";
import { readEnvProperty } from "../helpers/read_env_properties";
import { OpenAI } from "openai";
import { OpenAIEmbeddings } from "@langchain/openai";
import { OrgEmbeddings, orgChatCompletions } from "./org";
import { OllamaEmbeddings, ollamaChatCompletion } from "./ollama";

export type LLMChatCompletion = (body: any) => Promise<ChatCompletion>;

type LLMProvider = [LLMChatCompletion, Embeddings];

export const [modelProvider, model] = readEnvProperty("MODEL", true)?.split('/');
export const [embeddingModelProvider, embeddingModel] = readEnvProperty("EMBEDDING_MODEL", true)?.split('/');

export function ModelProvider(): LLMProvider {
    let chatFunction: LLMChatCompletion;
    let embeddingFunction: Embeddings;

    // Set model
    switch (modelProvider) {
        case "openai": {
            const openai = new OpenAI();
            chatFunction = openai.chat.completions.create.bind(openai.chat.completions);
            break;
        }
        case "org": {
            chatFunction = orgChatCompletions;
            break
        }
        case "ollama": {
            chatFunction = ollamaChatCompletion;
            break;
        }
        default: {
            throw new Error(
                "Please set a valid MODEL in your .env.local"
            );
        }
    }

    // Set Embedding Function
    switch (embeddingModelProvider) {
        case "openai": {
            embeddingFunction = new OpenAIEmbeddings({openAIApiKey: process.env.OPENAI_API_KEY});
            break;
        }
        case "org": {
            embeddingFunction = new OrgEmbeddings({
                maxConcurrency: 1,
                maxRetries: 2,
            });
            break;
        }
        case "ollama": {
            embeddingFunction = new OllamaEmbeddings()
            break;
        }
        default: {
            throw new Error(
                "Please set one of the known EMBEDDING_MODEL in your .env.local file"
            );
        }
    }

    return [chatFunction, embeddingFunction];
}
