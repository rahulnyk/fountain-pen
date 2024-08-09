"use server";

import { semanticSearch } from "../vector_store";
import { SearchResults } from "../return_types";
import { WritingPointResponse } from "../return_types";
import { ModelProvider, model, modelProvider } from "../llms";
import { readEnvProperty } from "../helpers/read_env_properties";

const [chatFunction] = ModelProvider();

export async function generateWritingPoints({
    heading,
    notes,
}: // text,
{
    heading?: string | null;
    notes?: string | null;
    // text?: string | null;
}): Promise<WritingPointResponse> {
    if (!heading && !notes) {
        return {
            data: '',
            error: "Place the cursor on a section of the article to give me some context.",
        };
    }
    const searchString = `${heading} \n ${notes}`;
    const res: SearchResults = await semanticSearch({
        text: searchString,
        numResults: 5,
    });
    if (res.error) {
        // return { data: [], error: results.error };
        console.log(res.error);
    }
    const docsString = res.documents
        .map((doc) => doc.pageContent)
        .join("\n-\n");

    const sysInstructions = [
        "You are tasked with extracting key points for a section of an article. ",
        "The user will provide you with some relevant documents along with specific section heading, section notes, and section content. ",
        "Your goal is to identify and extract the most pertenant points that can be used to write a section of the article with the given heading. ",
        "Ensure that the extracted points are atomistic and relevant to the heading and capture the essential information from the content. ",
        "If necessary, prioritize the points based on their importance or significance. \n",
    ].join("\n");


    let formatingInstructions: string
    if (modelProvider == 'ollama') {
        formatingInstructions = "Respond with a Markdown formatted Itomized list of writing points";

    } else {
        formatingInstructions = [
            "Format your response as JSON array of objects with following schema",
            "{key: number, point: text}",    
        ].join(" ");
    }

    const systemPrompt = `${sysInstructions}\n${formatingInstructions}`

    const user_prompt: string = [
        "Give me some writing points using the following inputs. \n\n",
        `## heading -> \n\n  ${heading}  \n\n`,
        `## notes -> \n\n  ${notes}  \n\n`,
        `## docs ->  \n\n ${docsString} \n\n`,
    ].join("\n");

    console.log("SYS PROMPT", systemPrompt, "USER PROMPT", user_prompt);
    try {
        const completion = await chatFunction({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: user_prompt },
            ],
            model,
            n: 1,
        });

        let writingPoints = completion.choices[0].message.content
        if (!writingPoints) {
            throw new Error(
                "Could not extract writing points from LLM response. Please try again"
            );
        }
        return { data: writingPoints, error: null };
    } catch (e: any) {
        return { data: '', error: e?.message };
    }
}
