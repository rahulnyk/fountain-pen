"use server";

import { pdfsDirLoadAndSplit } from "../helpers/pdfs_dir_load_and_split";
import { webLinksLoadAndSplit } from "../helpers/weblinks_load_and_split";
import { rebuildVectorStore } from ".";
import { getReferences } from "../ldb";
import { ReturnParams } from "../return_types";

export async function embeddAllDocuments(): Promise<ReturnParams> {
    try {
        const pdfDocs = await pdfsDirLoadAndSplit();
        const references = await getReferences();
        if (!references) {
            return { data: null, error: 'No ' };
        }
        const webLinkDocs = await webLinksLoadAndSplit(references);
        await rebuildVectorStore([...pdfDocs, ...webLinkDocs]);
        return { data: null, error: null, message: `PDF Docs: ${pdfDocs.length}, WEB LINK DOCS: ${webLinkDocs.length}` }
    } catch (e: any) {
        return { data: null, error: e?.message ? e.message : 'Something went wrong, Could not embedd the documents' };
    }
}
