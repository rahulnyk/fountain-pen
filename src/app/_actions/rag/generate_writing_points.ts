"use server";

// import { OpenAI } from "openai"; // Import OpenAI library
// const openai = new OpenAI(); // Initialize OpenAI with your API key
import { wmChatCompletions } from "@/app/_actions/helpers/llm-gateway/walmart_llm";

import { semanticSearch } from "../vector_store";
import { SearchResults } from "../return_types";
// import { ChatCompletion } from "openai/resources/index.mjs";
// import { wpSuggestion } from "@/app/_components/side_panel/writing_points_suggestions/writing_points_suggestions_card";
import { ReturnParams } from "../return_types";

export async function generateWritingPoints({
    heading,
    notes,
}: // text,
{
    heading?: string | null;
    notes?: string | null;
    // text?: string | null;
}): Promise<ReturnParams> {
    if (!heading && !notes) {
        return {data: null, error: "I need Headings or Note before I can suggest the writing points."};
    }
    const searchString = `${heading} \n ${notes}`;
    const res: SearchResults = await semanticSearch({ text: searchString, numResults: 5 });
    if (res.error) {
        return {data: [], error: res.error};
    }
    const docsString = res.documents.map((doc) => doc.pageContent).join("\n-\n");

    const system_prompt = [
        "You are tasked with extracting key points from a collection of documents.",
        "The input will consist of a series documents along with specific instructions such as heading, notes, and content.",
        "Your goal is to identify and extract the most important points and concepts from these documents to provide a concise summary or list of key points for the user to write about.",
        "Ensure that the extracted points are atomistic and relevant to the heading and capture the essential information from the content.",
        "If necessary, prioritize the points based on their importance or significance.",
        "Format your response as JSON array of objects with following schema",
        "{key: number, point: text}",
    ].join("\n");

    const user_prompt: string = [
        "Give me some writing points using the following inputs. ",
        `docs -> \n ${docsString} \n -------`,
        `heading -> \n ${heading} \n -------`,
        `notes -> \n ${notes} \n -------`,
        // `content -> \n ${text} \n -------`,
    ].join("\n");

    console.log("SYS PROMPT", system_prompt, "USER PROMPT", user_prompt);
    try {
        const completion = await wmChatCompletions({
            messages: [
                { role: "system", content: system_prompt },
                { role: "user", content: user_prompt },
            ],
            model: process.env.MODEL ? process.env.MODEL : "gpt-3.5-turbo",
            n: 1,
        });

        let writingPoints = completion.choices[0].message.content?.replace(
            /```json\n?|```/g,
            ""
        );
        // console.log(writingPoints);
        if (!writingPoints) {
            throw new Error("Could not extract writing points from LLM response. Please try again")
        }
        const wpResponse = JSON.parse(writingPoints);
        return {data: wpResponse, error: null};
    } catch (e: any) {
        return {data: null, error: e?.message}
    } 
}
