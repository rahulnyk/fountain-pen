"use server";

import { ContentSuggestionResponse } from "../return_types";
import { ModelProvider, model } from "../llms";
const [chatFunction] = ModelProvider();

export async function paraphraseContent({
    text,
    style,
}: {
    text: string | null;
    style: string | null | undefined;
}): Promise<ContentSuggestionResponse> {
    if (!style && !text) {
        return {
            data: "",
            error: "Please provide me with a style and place your cursor on a section of the article you want me to rephrase.",
        };
    }

    const system_prompt = [
        "You are the chief editor of a high quality journal. ",
        "The user will provide you a few paragraphs. ",
        "Your job is to paraphrase the user provided text in the following style.\n",
        `style -> \n ${style} \n `,
        "Make sure that the content is grammatically correct and easily readable. ",
        "Return only the rephrased paragraph in markdown format, and nothing else\n",
    ].join("\n");

    const user_prompt: string = [
        "Help me rephrase these paragraphs please \n",
        `# paragraphs -> \n\n ${text} \n\n`,
        ,
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
        return { data: content ? content : "", error: null };
    } catch (e: any) {
        console.log(e);
        return { data: "", error: e?.message };
    }
}
