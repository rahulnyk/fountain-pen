import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { textSplitter } from "./text_splitter";
import { Document } from "langchain/document";
/* Load all PDFs within the specified directory */

const DATA_DIRECTORY = "public/documents/";
const splitter = textSplitter();

export async function dirLoadAndSplit(): Promise<
    Document<Record<string, any>>[]
> {
    const directoryLoader = new DirectoryLoader(DATA_DIRECTORY, {
        ".pdf": (path: string) => new PDFLoader(path),
    });

    const docs = await directoryLoader.load();

    const splitDocs = await splitter.splitDocuments(docs);

    return splitDocs;
}
