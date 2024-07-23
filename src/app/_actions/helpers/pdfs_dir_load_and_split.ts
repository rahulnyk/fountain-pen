"use server";

import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { textSplitter } from "./text_splitter";
import { Document } from "langchain/document";
import { getDocumentsDir } from "./project_directory";
/* Load all PDFs within the specified directory */

// const PDF_DATA_DIRECTORY = "data/documents/";

export async function pdfsDirLoadAndSplit(): Promise<
    Document<Record<string, any>>[]
> {
    const dd = await getDocumentsDir();
    if (!dd) {
        throw Error("Not able to find the project directory");
    }
    const splitter = await textSplitter();
    const directoryLoader = new DirectoryLoader(dd, {
        ".pdf": (path: string) => new PDFLoader(path),
    });

    const docs = await directoryLoader.load();

    const splitDocs = await splitter.splitDocuments(docs);

    return splitDocs;
}
