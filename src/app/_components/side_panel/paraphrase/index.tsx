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
import { Button } from "../../button";

export const Paraphrase = ({ className }: { className?: string }) => {
    // const heading = useSectionContext((state) => state.heading);
    // const notes = useSectionContext((state) => state.notes);
    const defaultStyles = {
        Formal: "Formal language, use short sentences, technical language, active speach whenever possible",
        Casual: "Casual language, use short sentences, use active speech whenever possible",
        Fun: "Casual language, Add some humour whenever possible, use short sentences, use active speech whenever possible",
    };
    const text = useSectionContext((state) => state.text);
    const [style, setStyle] = useState<string | undefined>(undefined);

    const [isWaiting, setIsWaiting] = useState<boolean>(false);
    const [paraphrasedContent, setParaphrasedContent] =
        useState<ChatCompletion.Choice | null>(null);
    const [active, setActive] = useState<boolean>(false);

    const getParaphrasedContent = useCallback(async () => {
        // const inputStyle = style ? style : defaultStyles.Formal;
        const content = await paraphraseContent({
            text,
            style,
        });
        return content;
    }, [text, style]);

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

    const inputStyle = clsx(
        "appearance-none w-full py-4 px-2 leading-tight border rounded-md",
        "text-zinc-600 dark:text-zinc-400",
        "bg-transparent outline-none",
        "border-zinc-100 focus:border-blue-200 dark:border-zinc-600 dark:focus:border-blue-600",
        "text-sm"
    );
    const handleInputChange = (event: any) => {
        setStyle(event.target.value);
    };
    return (
        <TabPanel
            isWaiting={isWaiting}
            className={className}
            onClick={refresh}
            buttonActive={active}
            key="tab_panel_paraphrase"
            buttonText="REPHRASE THE PARAGRAPH"
            buttonVisible={false}
        >
            <div className="flex-col space-y-8 w-full">
                <div className="inline-flex flex-wrap justify-center align-middle space-x-4">
                    {Object.entries(defaultStyles).map(([key, value]) => (
                        <button
                            type="reset"
                            className={clsx(
                                "text-xs px-2 rounded-full py-1",
                                "bg-gradient-to-r from-indigo-700 to-blue-700",
                                "text-white dark:text-zinc-200 text-xs font-normal"
                            )}
                            onClick={() => {
                                setStyle(value);
                            }}
                            key={`paraphrase_${key}`}
                        >
                            {key}
                        </button>
                    ))}
                </div>
                <div className="space-y-2 my-0 mx-0 w-full">
                    <textarea
                        value={style}
                        placeholder="Describe Your Style"
                        className={inputStyle}
                        rows={4}
                        onChange={handleInputChange}
                        onBlur={handleInputChange}
                    />
                </div>
                <Button
                    active={active}
                    type="button"
                    loading={isWaiting}
                    className="bg-gradient-to-r from-indigo-700 to-blue-700"
                    onClick={refresh}
                >
                    REPHRASE THE PARAGRAPH
                </Button>
                <p className="whitespace-pre-line">
                    {paraphrasedContent && paraphrasedContent.message.content}
                </p>
            </div>
        </TabPanel>
    );
};
