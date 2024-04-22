"use server";

import { textSplitter } from "./text_splitter";
import { Document } from "langchain/document";
import { getReferences } from "../ldb";
import scrape from "./scrape";
import { References } from "../ldb";

/* Load all PDFs within the specified directory */

export async function webLinksLoadAndSplit(
    references: References[]
): Promise<Document<Record<string, any>>[]> {
    const splitter = await textSplitter();
    const documents = await Promise.all(
        references.map(async (reference): Promise<Document[]> => {
            const text = await scrape({ webLink: reference.source });
            if (!text) {
                return [];
            }
            let documents = await splitter.createDocuments([text]);
            documents = documents.map((doc) => {
                doc.metadata = { ...reference };
                return doc;
            });
            return documents;
        })
    );

    let docs = documents.reduce((elem1, elem2) => elem1.concat(elem2), []);

    return docs;
}
