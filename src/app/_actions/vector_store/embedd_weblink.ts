"use server";

import { References } from "../ldb";
import { addDocuments } from ".";
import { webLinksLoadAndSplit } from "../helpers/weblinks_load_and_split";

export default async function embeddWebLink(reference: References) {
    try {
        const docs = await webLinksLoadAndSplit([reference]);
        await addDocuments(docs);
    } catch (e: any) {
        console.log(e?.message);
    }
}
