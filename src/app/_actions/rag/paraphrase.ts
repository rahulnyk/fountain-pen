"use server";

// import { OpenAI } from "openai"; // Import OpenAI library

// const openai = new OpenAI(); // Initialize OpenAI with your API key

import { wmChatCompletions } from "@/app/_actions/helpers/llm-gateway/walmart_llm";

import { ChatCompletion } from "openai/resources/index.mjs";

export async function paraphraseContent({
    text,
    style,
}: {
    text: string | null;
    style: string | null | undefined;
}): Promise<ChatCompletion.Choice | null> {
    if (!style && !text) {
        return null;
    }

    const system_prompt = [
        "You are the chief editor of a high quality journal. ",
        "The user will provide you a few paragraphs. ",
        "Your job is to paraphrase the user provided text in the following style",
        `style -> \n ${style} \n `,
        "Make sure that the content is gramatically correct and easily readable.",
        "Return only the paraphrased paragraph and nothing else",
    ].join("\n");

    const user_prompt: string = [
        "Help me rephrase these paragraphs please \n",
        `paragraphs -> \n ${text} \n -------`,
        ,
    ].join("\n");

    console.log("SYS PROMPT", system_prompt, "USER PROMPT", user_prompt);
    let contentResponse = null;
    try {
        const completion = await wmChatCompletions({
            messages: [
                { role: "system", content: system_prompt },
                { role: "user", content: user_prompt },
            ],
            model: process.env.MODEL ? process.env.MODEL : "gpt-3.5-turbo",
            n: 1,
        });

        contentResponse = completion.choices[0];
    } catch (e) {
        console.log(e);
        contentResponse = null;
    } finally {
        return contentResponse;
    }
}
