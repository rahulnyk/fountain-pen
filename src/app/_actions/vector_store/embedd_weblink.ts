"use server";

import { References } from "../ldb";
import { addDocuments } from ".";
import { webLinksLoadAndSplit } from "../helpers/weblinks_load_and_split";

export default async function embeddWebLink(reference: References) {
    const docs = await webLinksLoadAndSplit([reference]);
    const res = await addDocuments(docs);
    return res;
}
