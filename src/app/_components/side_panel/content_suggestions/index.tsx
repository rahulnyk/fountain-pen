"use client";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useCallback } from "react";
import { ChatCompletion } from "openai/resources/index.mjs";
import { generateContent } from "@/app/_actions/rag/generate_content";
import { ContentCard } from "./content_card";
import { useSectionContext } from "@/app/_store/sectionContextStore";
import { TabPanel } from "../tab_panel";

export const ContentSuggestions = ({ className }: { className?: string }) => {
    const [isWaiting, setIsWaiting] = useState<boolean>(false);
    const [content, setContent] = useState<ChatCompletion.Choice | null>(null);
    const [active, setActive] = useState<boolean>(false);

    const heading = useSectionContext((state) => state.heading);
    const notes = useSectionContext((state) => state.notes);
    const text = useSectionContext((state) => state.text);

    const getContentSuggestions = useCallback(async () => {
        const contentSuggestions = await generateContent({
            heading,
            notes,
            text,
        });
        return contentSuggestions;
    }, [heading, notes, text]);

    const refresh = async () => {
        setIsWaiting(true);
        const contentSuggestions = await getContentSuggestions();
        setContent(contentSuggestions);
        // console.log("From Content Suggestion Component", contentSuggestions);
        setIsWaiting(false);
        setActive(false);
    };

    useEffect(() => {
        setActive(true);
    }, [heading, notes, text]);

    return (
        <TabPanel
            isWaiting={isWaiting}
            className={className}
            subheadingText="Content is generated using your documents, current section content, heading and notes."
            onClick={refresh}
            buttonActive={active}
            key="tab_panel_content_suggestion"
            buttonText="SUGGEST CONTENT"
        >
            <div className="space-y-2 my-0 mx-0 w-auto">
                {content && <ContentCard choice={content} />}
            </div>
        </TabPanel>
    );
};
