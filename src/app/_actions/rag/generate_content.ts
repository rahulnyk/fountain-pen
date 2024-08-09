"use server";

import { semanticSearch } from "../vector_store";
import { SearchResults, ContentSuggestionResponse } from "../return_types";
import { ModelProvider, model } from "../llms";
const [chatFunction] = ModelProvider();

export async function generateContent({
    heading,
    notes,
    text,
}: {
    heading: string | null;
    notes: string | null;
    text: string | null;
}): Promise<ContentSuggestionResponse> {
    if (!heading && !notes && !text) {
        return {
            data: "",
            error: "Place the cursor on a section of the article to give me some context",
        };
    }
    const searchString = `${heading} \n ${notes} \n ${text}`;
    const results: SearchResults = await semanticSearch({
        text: searchString,
        numResults: 3,
    });
    if (results.error) {
        // return { data: [], error: results.error };
        console.log(results.error);
    }
    const docsString = results.documents
        .map((doc) => doc.pageContent)
        .join("\n-\n");

    const system_prompt = [
        "You are an expert at writing non-fiction content. Your job is to assist the user write a small section of an article",
        "The user will provide you with the following inputs: \n",
        " - section heading: Very Important.  \n",
        " - section notes: Very important.  \n",
        " - initial section content: Initial content for the current section.\n",
        " - relevant documents: Some excerpts from reference articles.\n",
        "Write a few paragraphs for the given section. ",
        "Remeber the section heading and keep your content relevant to the given section heading only. ",
        "Write in simple and easily readable language. ",
        "Itemize your response whenever possible. Respond with Markdown formatted text. ",
    ].join("\n");

    const user_prompt: string = [
        "Help me write this section of the article \n",
        `# section heading -> \n\n ${heading} \n\n`,
        `# section notes -> \n\n ${notes} \n\n`,
        `# initial section content -> \n\n ${text} \n\n`,
        `# relevant documents -> \n\n ${docsString} \n\n`,
    ].join("\n");

    console.log("SYS PROMPT", system_prompt, "USER PROMPT", user_prompt);
    try {
        const completion = await chatFunction({
            messages: [
                { role: "system", content: system_prompt },
                { role: "user", content: user_prompt },
            ],
            model,
            n: 1,
        });

        const content = completion.choices[0].message.content;
        return { data: content ? content : "" };
        // console.log(contentResponse);
    } catch (e: any) {
        console.log(e?.messages);
        return { data: "", error: e?.message };
    }
}
