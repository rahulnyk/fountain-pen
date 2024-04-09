"use client";
import clsx from "clsx";
import { useEffect, useState } from "react";
import {
    generateOutline,
    outlineResponse,
} from "@/app/_actions/rag/generate_outline";
import { OutlineCard } from "./outline_card";
import { useCallback } from "react";
import { useSectionContext } from "@/app/_store/sectionContextStore";
import { TabPanel } from "../tab_panel";

export const Outline = ({ className }: { className?: string }) => {
    const [isWaiting, setIsWaiting] = useState<boolean>(false);
    const [outline, setOutline] = useState<outlineResponse[] | null>(null);
    const [active, setActive] = useState<boolean>(false);

    const title = useSectionContext((state) => state.title);
    const titleNotes = useSectionContext((state) => state.titleNotes);

    const getOutline = useCallback(async () => {
        const outlineRes = await generateOutline({
            title,
            titleNotes,
        });
        return outlineRes;
    }, [title, titleNotes]);

    const refresh = async () => {
        setIsWaiting(true);
        const outlineRes = await getOutline();
        setOutline(outlineRes);
        setIsWaiting(false);
        setActive(false);
    };

    useEffect(() => {
        setActive(true);
    }, [title, titleNotes]);

    const removeItem = (index: number) => {
        console.log("removeItem", index);
        const newOutline = outline;
        newOutline?.splice(index, 1);
        setOutline(newOutline);
    };

    return (
        <TabPanel
            isWaiting={isWaiting}
            className={className}
            subheadingText="Outline based on the Title and the Title Notes. For better results add more info to the Title Notes"
            onClick={refresh}
            buttonActive={active}
            key="tab_panel_outline"
        >
            <div className="space-y-2">
                {outline &&
                    outline.map((item, index) => (
                        <OutlineCard
                            item={item}
                            index={index}
                            removeItem={removeItem}
                            key={`${item.level}${index}`}
                        />
                    ))}
            </div>
        </TabPanel>
    );
};
