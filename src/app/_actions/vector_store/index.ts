"use server";
const projectDir = process.env.PROJECT_DIR;
import { FaissStore } from "@langchain/community/vectorstores/faiss";
// import { OpenAIEmbeddings } from "@langchain/openai";
import { WalmartEmbeddings } from "@/app/_actions/helpers/llm-gateway/walmart_embeddings";
import { Document } from "langchain/document";
import fs from "fs";
import { getWorkingDir } from "../helpers/project_directory";
// const DIRECTORY = "data/wd/";
const indexFilename = "faiss.index";
import { EmbeddingsParams } from "@langchain/core/embeddings";
import { ReturnParams } from "../return_types";
import { promises } from "dns";
import { SearchResults } from "../return_types";
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
        throw new Error("Not able to find the working directory");
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
        throw new Error("No documents to embedd");
    }
    const wd = await getWorkingDir();
    // if (fs.existsSync(`${wd}/${indexFilename}`)) {
    //     fs.unlinkSync(`${wd}/${indexFilename}`);
    //     console.log("Old Index deleted.");
    // }
    const store = await loadOrCreateVectorStore();
    await store.addDocuments(docs);
    await store.save(wd);
    // return {data: null, error: null}
    // } catch (e: any) {
    //     return {data: null, error: e?.message}
    // }
}

export async function addDocuments(docs: Document[]) {
    const wd = await getWorkingDir();
    if (!wd) {
        throw new Error("Not able to find the working directory");
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
}): Promise<SearchResults> {
    console.log(text);
    try {
        const wd = await getWorkingDir();
        if (!wd) {
            throw new Error("Not able to find the working directory");
        }
        const store = await FaissStore.load(wd, embeddingFunction);
        let documents = await store.similaritySearch(text, numResults);
        return {documents, error: undefined}
    } catch (e: any) {
        console.log("Could not retrieve results - ", e?.message);
        return {documents: [], error: e.message}
    } 
}
