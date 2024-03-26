import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

export function textSplitter() {
    const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 2000,
        chunkOverlap: 200,
    });

    return textSplitter;
}
