import React, { useEffect, useState } from "react";
import { useSlate } from "slate-react";
import { Transforms, Path } from "slate";
import { CustomBaseElement, Headings } from "../main_editor/types";
import { notesStyle } from "../main_editor/typography";
import { useSectionContext } from "@/app/_store/sectionContextStore";
import clsx from "clsx";

const Notes = ({ className }: { className?: string }) => {
    const editor = useSlate();
    const setNotesString = useSectionContext((state) => state.setNotesString);

    // const [lines, setLines] = useState<number>(10);
    const [text, setText] = useState<string>("");
    const [currentSectionHeading, setCurrentSectionHeading] = useState<
        CustomBaseElement | undefined
    >();
    const [currentSectionHeadingPath, setCurrentSectionHeadingPath] = useState<
        Path | undefined
    >();

    // useEffect(() => {
    //     setLines(text ? Math.min((text.match(/\n/g) || "").length + 1, 15) : 2);
    // }, [text]);

    const handleInputChange = (event: any) => {
        setText(event.target.value);
        Transforms.setNodes(
            editor,
            { notes: [text] },
            { at: currentSectionHeadingPath }
        );
        setNotesString(text);
    };

    useEffect(() => {
        const entry = editor.getPreviousSibling(
            [...Headings],
            editor.selection
        );
        if (entry) {
            const [n, p] = entry;
            setCurrentSectionHeading(n as CustomBaseElement);
            setCurrentSectionHeadingPath(p);
        } else {
            setCurrentSectionHeading(undefined);
            setCurrentSectionHeadingPath(undefined);
        }
    }, [editor.selection]);

    useEffect(() => {
        if (currentSectionHeading) {
            let txt = (currentSectionHeading as CustomBaseElement)?.notes?.[0];
            setText(txt);
        } else {
            setText("Notes ... ");
        }
    }, [currentSectionHeading]);

    return (
        <div
            className={clsx(
                "flex-col rounded-lg",
                "dark:bg-zinc-800 bg-white w-auto",
                " pb-3 pt-5",
                className
            )}
        >
            <>
                {currentSectionHeading && (
                    <div>
                        <div className={clsx("mt-0 px-2 pt-0")}>
                            <textarea
                                value={text}
                                onChange={handleInputChange}
                                className={clsx(
                                    "w-full p-0 px-1 focus:outline-none text-sm",
                                    "bg-transparent",
                                    notesStyle
                                )}
                                rows={10}
                                onBlur={handleInputChange}
                            />
                        </div>
                    </div>
                )}
            </>
            <>
                {!currentSectionHeading && (
                    <div>
                        <div
                            className={clsx(
                                "p-5 py-0 text-xs font-bold opacity-50 text-rose-700 mb-2"
                            )}
                        >
                            PLACE THE CURSOR ON A SECTION OF THE ARTICLE
                        </div>
                    </div>
                )}
            </>
        </div>
    );
};

export default Notes;
