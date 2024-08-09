import { Embeddings, EmbeddingsParams } from "@langchain/core/embeddings";
import { readEnvProperty } from "../helpers/read_env_properties";
import { LLMChatCompletion } from ".";
import { ChatCompletion } from "openai/resources/index.mjs";
import ollama from 'ollama'

export const ollamaChatCompletion: LLMChatCompletion = async (body) =>  {
    const model = body?.model;
    const response = await ollama.chat({
        model,
        messages: body.messages,        
      })

    const results: ChatCompletion = {
        id: '',
        choices: [{
            index: 1,
            finish_reason: 'stop',
            message: {role: 'assistant', content: response.message.content},
            logprobs: null,
        }],
        created: Date.now(),
        model, 
        object: 'chat.completion'
    }
    return results
}

export class OllamaEmbeddings extends Embeddings {

    constructor(params?: EmbeddingsParams) {
        const embeddingParams = params ? params : {};
        super(embeddingParams); // call the parent constructor
    }

    async embedDocuments(documents: string[]): Promise<number[][]> {
        const result = await this.embed(documents);
        return result;
    }

    async embedQuery(document: string): Promise<number[]> {
        const result = await this.embed([document]);
        console.log('embedQuery: ', document, result)
        return result[0];
    }

    async embed(docs: string[]): Promise<number[][]> {
        const model =  readEnvProperty('EMBEDDING_MODEL', true);
        const request = {
            model,
            input: docs
        }
        const response = await ollama.embed(request)
        console.log('Ollama Embeddings', response)
        return response.embeddings
    }
}
