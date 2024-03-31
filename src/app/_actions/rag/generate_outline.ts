"use server";

import { OpenAI } from "openai"; // Import OpenAI library

const openai = new OpenAI(); // Initialize OpenAI with your API key

export type outlineResponse = {
    level: string;
    text: string;
    description: string;
};

export async function generateOutline({
    title,
    notes,
    outline,
}: {
    title: string;
    notes?: string;
    outline?: string[];
}) {
    const system_prompt = [
        "You are a writing assistant. The user will provide you with some inputs",
        "Your job is to suggest a good outline for an article. ",
        "Outline of an article is composed of multiple headings to cover all aspects of the topic of the article.",
        "Within each heading there can be any number of sub headings. ",
        "Respond with an array of objects as JSON where every object is of the following type \n",
        `{
            level: string (heading, or subheading),
            text: string,
            description: what to write about in this heading or subheading,
        }`,
        "Be detailed in your response.",
    ].join("/n");

    const user_prompt: string = [
        `Suggest me a good outline for an article on the title" "${title}"`,
        notes ? `Here are my initial thoughts about the article: ${notes}` : "",
    ].join("\n");

    console.log(user_prompt, system_prompt);
    let outlineObject: outlineResponse[] = [];
    try {
        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: system_prompt },
                { role: "user", content: user_prompt },
            ],
            model: "gpt-3.5-turbo",
            // response_format: { type: "json_object" },
        });

        let outlineResponse = completion.choices[0].message.content;
        outlineObject = JSON.parse(outlineResponse ? outlineResponse : "[]");
    } catch (e) {
        outlineObject = [];
        console.log(e);
    } finally {
        return outlineObject;
    }
}
