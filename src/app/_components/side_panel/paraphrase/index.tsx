"use client";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useCallback } from "react";
// import { contentCard } from "./writing_points_suggestions_card";
// import { generateWritingPoints } from "@/app/_actions/rag/generate_writing_points";
// import { wpSuggestion } from "./writing_points_suggestions_card";
import { paraphraseContent } from "@/app/_actions/rag/paraphrase";
import { useSectionContext } from "@/app/_store/sectionContextStore";
import { TabPanel } from "../tab_panel";
import { ChatCompletion } from "openai/resources/index.mjs";

export const Paraphrase = ({ className }: { className?: string }) => {
    // const heading = useSectionContext((state) => state.heading);
    // const notes = useSectionContext((state) => state.notes);
    const text = useSectionContext((state) => state.text);
    const style =
        "Formal style, short sentences, technical language, active speach whenever possible";

    const [isWaiting, setIsWaiting] = useState<boolean>(false);
    const [paraphrasedContent, setParaphrasedContent] =
        useState<ChatCompletion.Choice | null>(null);
    const [active, setActive] = useState<boolean>(false);

    const getParaphrasedContent = useCallback(async () => {
        const content = await paraphraseContent({
            text,
            style,
        });
        return content;
    }, [text]);

    const refresh = async () => {
        setIsWaiting(true);

        const content = await getParaphrasedContent();
        setParaphrasedContent(content);
        console.log(content);
        setIsWaiting(false);
        // setActive(false);
    };

    useEffect(() => {
        setActive(true);
    }, [text]);

    return (
        <TabPanel
            isWaiting={isWaiting}
            className={className}
            subheadingText="Rephrase the current paragraph in your style."
            onClick={refresh}
            buttonActive={active}
            key="tab_panel_wp"
            buttonText="REPHRASE THE PARAGRAPH"
        >
            <div className="space-y-2 my-0 mx-0 w-auto">
                {paraphrasedContent && paraphrasedContent.message.content}
            </div>
        </TabPanel>
    );
};
