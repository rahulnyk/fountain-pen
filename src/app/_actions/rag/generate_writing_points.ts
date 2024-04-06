"use server";

import { OpenAI } from "openai"; // Import OpenAI library
const openai = new OpenAI(); // Initialize OpenAI with your API key
import { semanticSearch } from "../vector_store";
import { ChatCompletion } from "openai/resources/index.mjs";
import { wpSuggestion } from "@/app/_components/side_panel/writing_points_suggestions/writing_points_suggestions_card";

export async function generateWritingPoints({
    heading,
    notes,
    text,
}: {
    heading: string;
    notes: string;
    text: string;
}): Promise<wpSuggestion[]> {
    const searchString = `${heading} \n ${notes} \n ${text}`;
    const docs = await semanticSearch({ text: searchString, numResults: 3 });
    const docsString = docs.map((doc) => doc.pageContent).join("\n-\n");

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
        `content -> \n ${text} \n -------`,
    ].join("\n");

    console.log("SYS PROMPT", system_prompt, "USER PROMPT", user_prompt);
    let wpResponse: wpSuggestion[] = [];
    try {
        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: system_prompt },
                { role: "user", content: user_prompt },
            ],
            model: "gpt-3.5-turbo",
            n: 1,
        });

        let writingPoints = completion.choices[0].message.content?.replace(
            /```json\n?|```/g,
            ""
        );
        // console.log(writingPoints);
        wpResponse = JSON.parse(writingPoints ? writingPoints : "[]");
    } catch (e) {
        console.log(e);
        wpResponse = [];
    } finally {
        return wpResponse;
    }
}
