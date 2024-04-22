"use server";

import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

export async function textSplitter() {
    const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 2000,
        chunkOverlap: 200,
    });

    return textSplitter;
}
