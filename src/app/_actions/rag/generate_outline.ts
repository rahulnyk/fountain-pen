"use server";

import { semanticSearch } from "../vector_store";
import { SearchResults } from "../return_types";
import { OutlineResponse, Section } from "../return_types";

import { ModelProvider, model, modelProvider } from "../llms";
import { ChatCompletion } from "openai/resources/index.mjs";
import { readEnvProperty } from "../helpers/read_env_properties";

const [chatFunction] = ModelProvider();

export async function generateOutline({
    title,
    titleNotes,
}: {
    title: string | null;
    titleNotes?: string | null;
}): Promise<OutlineResponse> {

    if (!title && !titleNotes) {
        return {
            data: [],
            error: "I need a Title and some Notes about your article before I can suggest an outline",
        };
    }

    const searchString = `${title} \n ${titleNotes}`;
    const results: SearchResults = await semanticSearch({
        text: searchString,
        numResults: 5,
    });
    if (results.error) {
        // return { data: [], error: results.error };
        console.log(results.error);
    }
    const docsString = results.documents
        .map((doc) => doc.pageContent)
        .join("\n-\n");
    const sysInstructions = [
        "Develop the outline for an article discussing the topic given by the user.",
        "Incorporate the rough title Notes and relevant documents (if provided by the user) into your outline.",
        "Consider structuring your outline with an introduction, main sections, supporting points or arguments, and a conclusion.",
        "Aim to create a clear and logical flow of ideas that effectively communicates your message to the reader.",
        "Aim to create headings that cover distinct aspects of the topic that do not overlap with each other",
        "Remember to add conclusion and references headings towards the end of the outline",
    ].join(" ");

    let formatingInstructions: string


    if (modelProvider == 'ollama') {
        formatingInstructions = "Respond with a Markdown formatted text";
    } else {
        formatingInstructions = ["Respond with a valid JSON with the following schema\n",
            // "Respond with a JSON array of objects where every object is of the following type \n",
            `[{
            level: string ("heading"),
            text: string,
            description: Text. Notes on what to write in this heading. be detailed when possible,
        }, {...}]`,
        ].join(" ");

    }

    const systemPrompt = `${sysInstructions}\n${formatingInstructions}`

    const user_prompt: string = [
        `# Topic: ${title}\n\n`,
        titleNotes ? `## Rough title Notes: ${titleNotes}\n\n` : "",
        `## relevant documents: \n\n ${docsString} \n\n`,
        "Also suggest more ideas and headings (apart from my titleNotes) that I can write about",
    ].join("\n");

    console.log("\nSYS\n", systemPrompt, "\nUSER\n", user_prompt);

    let completion: ChatCompletion
    try {
        completion = await chatFunction({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: user_prompt },
            ],
            model,
            // response_format: { type: "json_object" },
        });
    } catch (e: any) {
        console.log(e);
        return { data: [], error: e?.message };
    }

    const outlineResponse = completion.choices[0].message.content
    if (!outlineResponse) {
        return {
            data: [],
            error: "Could not get a response from the LLM. Please try again",
        };
    }
    console.log("Generate Outline: \n", completion.choices[0].message.content)

    try {
        let jsonResponse = completion.choices[0].message.content?.replace(
            /```json\n?|```/g,
            ""
        );
        return {
            data: JSON.parse(jsonResponse ? jsonResponse : ''),
            dataType: 'json',
        }
    } catch (e: any) {
        return {
            data: outlineResponse,
            dataType: 'string'
        }
    }
}
