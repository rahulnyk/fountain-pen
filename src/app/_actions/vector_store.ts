"use server";

import { dirLoadAndSplit } from "../_helpers/dir_load_and_split";

import { HNSWLib } from "@langchain/community/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "@langchain/openai";
import { Document } from "langchain/document";

const DIRECTORY = "data/";

const embeddingFunction = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY,
});

export async function embeddDocuments() {
    const docs = await dirLoadAndSplit();
    console.log("embedding docs", docs.length);
    const vectorStore = await HNSWLib.fromDocuments(docs, embeddingFunction);

    await vectorStore.save(DIRECTORY);
}

export async function semanticSearch({
    text,
    numResults,
}: {
    text: string;
    numResults: number;
}): Promise<Document<Record<string, any>>[]> {
    // console.log(text);
    const store = await HNSWLib.load(DIRECTORY, embeddingFunction);
    const result = await store.similaritySearch(text, numResults);
    return result;
}

export async function vStore() {
    const store = await HNSWLib.load(DIRECTORY, embeddingFunction);
    return store;
}
