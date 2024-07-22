"use server";

import { HNSWLib } from "@langchain/community/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "@langchain/openai";
import { Document } from "langchain/document";

const DIRECTORY = "data/wd/";

const embeddingFunction = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY,
});

export async function rebuildVectorStore(docs: Document[]) {
    try {
        const oldIndex = await HNSWLib.load(DIRECTORY, embeddingFunction);
        oldIndex.delete({ directory: DIRECTORY });
    } catch (e: any) {
        console.log(e.message);
    }

    const vectorStore = await HNSWLib.fromDocuments(docs, embeddingFunction);
    return await vectorStore.save(DIRECTORY);
}

export async function addDocuments(documents: Document[]) {
    const store = await HNSWLib.load(DIRECTORY, embeddingFunction);
    const result = await store.addDocuments(documents);
    return result;
}

export async function semanticSearch({
    text,
    numResults,
}: {
    text: string;
    numResults: number;
}): Promise<Document<Record<string, any>>[]> {
    console.log(text);
    const store = await HNSWLib.load(DIRECTORY, embeddingFunction);
    const result = await store.similaritySearch(text, numResults);
    return result;
}

export async function vStore() {
    const store = await HNSWLib.load(DIRECTORY, embeddingFunction);
    return store;
}
