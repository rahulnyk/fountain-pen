"use server";

import { pdfsDirLoadAndSplit } from "../helpers/pdfs_dir_load_and_split";
import { webLinksLoadAndSplit } from "../helpers/weblinks_load_and_split";
import { rebuildVectorStore } from ".";
import { getReferences } from "../ldb";

export async function embeddAllDocuments() {
    const pdfDocs = await pdfsDirLoadAndSplit();
    const references = await getReferences();
    if (!references) {
        return [];
    }
    const webLinkDocs = await webLinksLoadAndSplit(references);
    console.log(
        "PDF Docs",
        pdfDocs.length,
        "WEB LINK DOCS",
        webLinkDocs.length
    );
    const res = await rebuildVectorStore([...pdfDocs, ...webLinkDocs]);
    return res;
}
