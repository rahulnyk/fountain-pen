"use server";

import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { OpenAIEmbeddings } from "@langchain/openai";
import { Document } from "langchain/document";
import fs from "fs";

const DIRECTORY = "data/wd/";
const indexFilename = "faiss.index";

const embeddingFunction = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY,
});

async function loadOrCreateVectorStore(): Promise<FaissStore> {
    try {
        return await FaissStore.load(DIRECTORY, embeddingFunction);
    } catch (e: any) {
        console.log("Existing store not found", e?.message);
        return new FaissStore(new OpenAIEmbeddings(), {});
    }
}

export async function rebuildVectorStore(docs: Document[]) {
    if (docs.length == 0) {
        return;
    }
    try {
        fs.unlinkSync(`${DIRECTORY}${indexFilename}`);
        console.log("Old Index deleted.");
    } catch (e: any) {
        console.error(
            `Not able to delete ${DIRECTORY}${indexFilename} - `,
            e?.message
        );
    }
    const store = await loadOrCreateVectorStore();
    await store.addDocuments(docs);
    await store.save(DIRECTORY);
}

export async function addDocuments(docs: Document[]) {
    const store = await loadOrCreateVectorStore();
    await store.addDocuments(docs);
    store.save(DIRECTORY);
}

export async function semanticSearch({
    text,
    numResults,
}: {
    text: string;
    numResults: number;
}): Promise<Document<Record<string, any>>[] | undefined> {
    console.log(text);
    let result: Document[];
    try {
        const store = await FaissStore.load(DIRECTORY, embeddingFunction);
        result = await store.similaritySearch(text, numResults);
        return result;
    } catch (e: any) {
        console.log("Could not retrieve results - ", e?.message);
    }
}
