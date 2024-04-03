"use server";

import { OpenAI } from "openai"; // Import OpenAI library

const openai = new OpenAI(); // Initialize OpenAI with your API key

import { semanticSearch } from "../vector_store";

import { ChatCompletion } from "openai/resources/index.mjs";

export async function generateContent({
    title,
    titleNotes,
    heading,
    notes,
    text,
}: {
    title: string;
    titleNotes: string;
    heading: string;
    notes: string;
    text: string;
}): Promise<ChatCompletion.Choice[]> {
    const searchString = `${title} \n ${titleNotes} \n ${heading} \n ${notes} \n ${text}`;
    const docs = await semanticSearch({ text: searchString, numResults: 3 });
    const docsString = docs.map((doc) => doc.pageContent);

    const system_prompt = [
        "You are an expert at writing professional content. Your job is to assist the user write a part (section) of an article",
        "The user will provide you with the following inputs (delimited by ###) pertaining to the current section of the article:",
        "title: Title of the article.",
        "docs: Semantic search documents related to the current section of the article.",
        "heading: Heading of the current section of the article.",
        "notes: Notes about the current section.",
        "initial_content: Inital content of the current section.",
        "Generate content for the current section, incorporating the provided information.",
        "Do not add conclusions at the end of your respoonse",
        "If initial_content for the current section is provided, use it as a starting point for suggesting the final content.",
    ].join("\n");

    const user_prompt: string = [
        "Help me write this section of the article",
        `title: ### ${title} ###`,
        `docs: ### ${docsString} ###`,
        `heading: ### ${heading} ###`,
        `notes: ### ${notes} ###`,
        `initial_content: ### ${text} ###`,
    ].join("\n");

    console.log("SYS PROMPT", system_prompt, "USER PROMPT", user_prompt);
    let contentResponse: ChatCompletion.Choice[] = [];
    try {
        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: system_prompt },
                { role: "user", content: user_prompt },
            ],
            model: "gpt-3.5-turbo",
            n: 1,
        });

        contentResponse = completion.choices;
        // console.log(contentResponse);
    } catch (e) {
        console.log(e);
        contentResponse = [];
    } finally {
        return contentResponse;
    }
}
