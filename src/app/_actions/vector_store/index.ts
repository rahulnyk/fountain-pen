"use server";

import { FaissStore } from "@langchain/community/vectorstores/faiss";
// import { OpenAIEmbeddings } from "@langchain/openai";
import { WalmartEmbeddings } from "@/app/_actions/helpers/llm-gateway/walmart_embeddings";
import { Document } from "langchain/document";
import fs from "fs";
import { getWorkingDir } from "../helpers/project_directory";
// const DIRECTORY = "data/wd/";
const indexFilename = "faiss.index";
import { EmbeddingsParams } from "@langchain/core/embeddings";

// const embeddingFunction = new OpenAIEmbeddings({
//     openAIApiKey: process.env.OPENAI_API_KEY,
// });
const embeddingParams: EmbeddingsParams = {
    maxConcurrency : 1,
    maxRetries: 2
};
const embeddingFunction = new WalmartEmbeddings(embeddingParams)

async function loadOrCreateVectorStore(): Promise<FaissStore> {
    const wd = await getWorkingDir();
    if (!wd) {
        throw Error("Not able to find the working directory");
    }
    try {
        return await FaissStore.load(wd, embeddingFunction);
    } catch (e: any) {
        console.log("Existing store not found", e?.message);
        return new FaissStore(embeddingFunction, {});
    }
}

export async function rebuildVectorStore(docs: Document[]) {
    if (docs.length == 0) {
        return;
    }
    const wd = await getWorkingDir();
    if (!wd) {
        throw Error("Not able to find the working directory");
    }
    try {
        fs.unlinkSync(`${wd}/${indexFilename}`);
        console.log("Old Index deleted.");
    } catch (e: any) {
        console.error(
            `Not able to delete ${wd}/${indexFilename} - `,
            e?.message
        );
    }
    const store = await loadOrCreateVectorStore();
    await store.addDocuments(docs);
    await store.save(wd);
}

export async function addDocuments(docs: Document[]) {
    const wd = await getWorkingDir();
    if (!wd) {
        throw Error("Not able to find the working directory");
    }
    const store = await loadOrCreateVectorStore();
    await store.addDocuments(docs);
    store.save(wd);
}

export async function semanticSearch({
    text,
    numResults,
}: {
    text: string;
    numResults: number;
}): Promise<Document<Record<string, any>>[]> {
    console.log(text);
    let result: Document[] = [];
    try {
        const wd = await getWorkingDir();
        if (!wd) {
            throw Error("Not able to find the working directory");
        }
        const store = await FaissStore.load(wd, embeddingFunction);
        result = await store.similaritySearch(text, numResults);
    } catch (e: any) {
        console.log("Could not retrieve results - ", e?.message);
    } finally {
        return result;
    }
}
