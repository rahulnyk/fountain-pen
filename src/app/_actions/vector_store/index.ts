"use server";
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { Document } from "langchain/document";
import { getWorkingDir } from "../helpers/project_directory";
import { SearchResults } from "../return_types";
import { ModelProvider } from "../llms";

const [, embeddingFunction] = ModelProvider();

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
    const store = await loadOrCreateVectorStore();
    await store.addDocuments(docs);
    await store.save(wd);
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
        console.log('Semantic Search: ', documents);
        return { documents };
    } catch (e: any) {
        console.log("Could not retrieve results - ", e?.message);
        return { documents: [], error: e.message };
    }
}
