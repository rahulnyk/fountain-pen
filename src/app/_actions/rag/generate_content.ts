"use server";

import { semanticSearch } from "../vector_store";
import { SearchResults, ContentSuggestionResponse } from "../return_types";
import { LLMProvider } from "../llms";
const [chatFunction] = LLMProvider();

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
        numResults: 5,
    });
    if (results.error) {
        return { data: "", error: results.error };
    }
    const docsString = results.documents
        .map((doc) => doc.pageContent)
        .join("\n-\n");

    const system_prompt = [
        "You are an expert at writing non-fiction content. Your job is to assist the user write a small section of an article",
        "The user will provide you with the following inputs:",
        "section heading: Heading of the current section.",
        "notes: Very important. Notes about the current section.",
        "initial content: Inital content for the current section.",
        "docs: Semantic search documents pertinent to the current section.",
        "Write the section content incorporating the provided information.",
        "Do not add conclusions or summary at the end of your respoonse",
        "Write in simple and easily readable language.",
        "use short sentences as much as possible. Do not try to sound sophesticated. Add humour whever possible.",
        "Use pronounds like 'we', 'you', 'us', etc. instead of 'individual' or 'one' etc.",
        "Itomise your response whenever possible. ",
    ].join("\n");

    const user_prompt: string = [
        "Help me write this section of the article",
        `section heading -> \n ${heading} \n -------`,
        `notes -> \n ${notes} \n -------`,
        `initial content -> \n ${text} \n -------`,
        `docs -> \n ${docsString} \n -------`,
    ].join("\n");

    console.log("SYS PROMPT", system_prompt, "USER PROMPT", user_prompt);
    try {
        const completion = await chatFunction({
            messages: [
                { role: "system", content: system_prompt },
                { role: "user", content: user_prompt },
            ],
            model: process.env.MODEL ? process.env.MODEL : "gpt-3.5-turbo",
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
