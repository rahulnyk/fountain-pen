"use server";

import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { textSplitter } from "./text_splitter";
import { Document } from "langchain/document";
/* Load all PDFs within the specified directory */

const PDF_DATA_DIRECTORY = "documents/";

export async function pdfsDirLoadAndSplit(): Promise<
    Document<Record<string, any>>[]
> {
    const splitter = await textSplitter();
    const directoryLoader = new DirectoryLoader(PDF_DATA_DIRECTORY, {
        ".pdf": (path: string) => new PDFLoader(path),
    });

    const docs = await directoryLoader.load();

    const splitDocs = await splitter.splitDocuments(docs);

    return splitDocs;
}
