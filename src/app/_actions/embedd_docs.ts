"use server";

import { dirLoadAndSplit } from "../_helpers/dir_load_and_split";

import { HNSWLib } from "@langchain/community/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "@langchain/openai";

const DIRECTORY = "data/embeddings/";
export async function embeddDocuments() {
    const docs = await dirLoadAndSplit();
    console.log("embedding docs", docs.length);
    const vectorStore = await HNSWLib.fromDocuments(
        docs,
        new OpenAIEmbeddings({
            openAIApiKey: process.env.OPENAI_API_KEY,
        })
    );

    await vectorStore.save(DIRECTORY);
}
