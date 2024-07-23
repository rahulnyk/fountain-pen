"use server";

import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { OpenAIEmbeddings } from "@langchain/openai";
import { Document } from "langchain/document";
import fs from "fs";
import { getWorkingDir } from "../helpers/project_directory";
// const DIRECTORY = "data/wd/";
const indexFilename = "faiss.index";

const embeddingFunction = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY,
});

async function loadOrCreateVectorStore(): Promise<FaissStore> {
    const wd = await getWorkingDir();
    if (!wd) {
        throw Error("Not able to find the working directory");
    }
    try {
        return await FaissStore.load(wd, embeddingFunction);
    } catch (e: any) {
        console.log("Existing store not found", e?.message);
        return new FaissStore(new OpenAIEmbeddings(), {});
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
