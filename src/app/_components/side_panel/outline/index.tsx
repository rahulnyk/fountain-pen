"use client";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useSlate } from "slate-react";
import {
    generateOutline,
    outlineResponse,
} from "@/app/_actions/rag/generate_outline";
import { OutlineCard } from "./outline_card";
import { useCallback } from "react";
import { useSectionContext } from "@/app/_store/sectionContextStore";
import { TabPanel } from "../tab_panel";
import { CustomElement } from "../../main_editor/types";
import { Transforms, Path } from "slate";
import { RiArrowLeftDoubleFill } from "react-icons/ri";

export const Outline = ({ className }: { className?: string }) => {
    const [isWaiting, setIsWaiting] = useState<boolean>(false);
    const [outline, setOutline] = useState<outlineResponse[]>([]);
    const [active, setActive] = useState<boolean>(false);

    const title = useSectionContext((state) => state.title);
    const titleNotes = useSectionContext((state) => state.titleNotes);

    const getOutline = useCallback(async () => {
        const outlineRes = await generateOutline({
            title,
            titleNotes,
        });
        return outlineRes ? outlineRes : [];
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

    //// Copy heading to the editor.
    const editor = useSlate();

    const handleInsert = (item: outlineResponse, index: number) => {
        if (!editor.selection) {
            return;
        }
        insertInToEditor(item);
        removeFromOutline(index);
    };

    const removeFromOutline = (index: number) => {
        let newOutline = outline;
        newOutline?.splice(index, 1);
        setOutline(newOutline);
        console.log(outline);
    };

    const insertInToEditor = (item: outlineResponse) => {
        const element: CustomElement = {
            type: "heading1",
            children: [{ text: item.text }],
            notes: [item.description ? item.description : ""],
        };
        const elementEntry = editor.getCurrentElement();
        if (elementEntry) {
            const [, currentElementPath] = elementEntry;
            Transforms.insertNodes(editor, element, {
                at: Path.next(currentElementPath),
            });
            editor.select(Path.next(currentElementPath));
            Transforms.collapse(editor, { edge: "start" });
        }
    };
    /////

    return (
        <TabPanel
            isWaiting={isWaiting}
            className={className}
            subheadingText="Outline based on the Title and the Title Notes. For better results add more info to the Title Notes"
            onClick={refresh}
            buttonActive={active}
            key="tab_panel_outline"
            buttonText="GENERATE OUTLINE"
        >
            <div className="space-y-2">
                {outline.map((item, index) => (
                    <div className="flex flex-grow space-x-2 items-center">
                        {/* Icon */}
                        <div
                            className={clsx(
                                "flex items-center justify-center rounded-full size-6 p-1",
                                "focus:ring-4 focus:outline-none",
                                "dark:bg-blue-700 dark:hover:bg-blue-900 dark:text-gray-200",
                                "bg-blue-400 hover:bg-blue-600 text-white"
                            )}
                        >
                            <RiArrowLeftDoubleFill
                                onClick={() => handleInsert(item, index)}
                                className="size-4"
                            />
                        </div>
                        {/* Card */}
                        <OutlineCard
                            item={item}
                            index={index}
                            // removeFromOutline={removeFromOutline}
                            key={`${item.level}${index}`}
                        />
                    </div>
                ))}
            </div>
        </TabPanel>
    );
};
