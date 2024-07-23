"use server";

import { OpenAI } from "openai"; // Import OpenAI library
import { semanticSearch } from "../vector_store";
const openai = new OpenAI(); // Initialize OpenAI with your API key

export type outlineResponse = {
    level: string;
    text: string;
    description?: string;
};

const dummy_data: outlineResponse[] = [
    {
        level: "heading",
        text: "Dummy Heading 1",
        description:
            "tLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
        level: "subheading",
        text: "Dummy Sub-Heading 1",
        description: "this is a dummy subheading for test",
    },
    {
        level: "heading",
        text: "Dummy Heading 2",
        description: "this is a dummy heading 2 for dev",
    },
    {
        level: "subheading",
        text: "Dummy Sub-Heading 2",
        description: "this is a dummy heading 2 for dev",
    },
];

const env = "dev";

export async function generateOutline({
    title,
    titleNotes,
}: {
    title: string | null;
    titleNotes?: string | null;
}): Promise<outlineResponse[] | null> {
    if (!title && !titleNotes) {
        return null;
    }
    console.log("generate outline called");

    // if (env === "dev") {
    //     return dummy_data;
    // }
    const searchString = `${title} \n ${titleNotes}`;
    const docs = await semanticSearch({ text: searchString, numResults: 5 });
    const docsString = docs.map((doc) => doc.pageContent).join("\n-\n");
    const system_prompt = [
        "Develop the outline for an article discussing the topic give by the user.",
        "Incorporate the rough titleNotes (if provided by the user) into your outline.",
        "Consider structuring your outline with an introduction, main sections, supporting points or arguments, and a conclusion.",
        "Aim to create a clear and logical flow of ideas that effectively communicates your message to the reader.",
        "Aim to create headings that cover distinct aspects of the topic that do not overlap with each other",
        "Remember to add conclusion and references headings towards the end of the outline",
        "Respond with a valid JSON with the following schema\n",
        // "Respond with a JSON array of objects where every object is of the following type \n",
        `[{
            level: string ("heading"),
            text: string,
            description: Text. Notes on what to write in this heading. be detailed when possible,
        }, {...}]`,
    ].join(" ");

    const user_prompt: string = [
        `Topic: ${title}`,
        titleNotes ? `Rough titleNotes: ${titleNotes}.` : "",
        `docs: ${docsString} \n ----- \n`,
        "Also suggest more ideas and headings (apart from my titleNotes) that I can write about",
    ].join("\n");

    console.log("SYS\n", system_prompt, "USER\n", user_prompt);
    let outlineObject = null;
    try {
        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: system_prompt },
                { role: "user", content: user_prompt },
            ],
            model: process.env.MODEL ? process.env.MODEL : "gpt-3.5-turbo",
            // response_format: { type: "json_object" },
        });

        let outlineResponse = completion.choices[0].message.content?.replace(
            /```json\n?|```/g,
            ""
        );
        // console.log(outlineResponse);
        outlineObject = JSON.parse(outlineResponse ? outlineResponse : "[]");
    } catch (e) {
        outlineObject = null;
        console.log(e);
    } finally {
        return outlineObject;
    }
}
