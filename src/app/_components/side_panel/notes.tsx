import { useEffect, useState } from "react";
import { useSlate } from "slate-react";
import { Transforms, Node, Path } from "slate";
import { CustomBaseElement } from "../main_editor/types";
import { notesStyle } from "../main_editor/typography";
import { MdOutlineSpeakerNotes } from "react-icons/md";
import { MdExpandLess } from "react-icons/md";
import { MdExpandMore } from "react-icons/md";
import { Headings } from "../main_editor/types";
import { generalTextStyle } from "../main_editor/typography";

import clsx from "clsx";

const Notes = ({ className }: { className?: string }) => {
    const editor = useSlate();

    const [lines, setLines] = useState<number>(2);
    const [text, setText] = useState<string>("");
    const [notesHeading, setNotesHeading] = useState<string>("");
    const [collapsed, setCollapsed] = useState(false);
    const [currentElement, setCurrentElement] = useState<Node>();
    const [currentSectionHeading, setCurrentSectionHeading] = useState<
        CustomBaseElement | undefined
    >();
    const [currentSectionHeadingPath, setCurrentSectionHeadingPath] = useState<
        Path | undefined
    >();

    useEffect(() => {
        setLines(text ? Math.min((text.match(/\n/g) || "").length + 1, 15) : 2);
    }, [text]);

    // text area helpers

    const handleInputChange = (event: any) => {
        setText(event.target.value);
        Transforms.setNodes(
            editor,
            { notes: [text] },
            { at: currentSectionHeadingPath }
        );
        // console.log(element);
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
            setNotesHeading(chop(editor.getElementText(currentSectionHeading)));
        } else {
            setText("Notes ... ");
            setNotesHeading("");
        }
    }, [currentSectionHeading]);

    const chop = (txt: string | undefined): string => {
        if (!txt) {
            return "";
        }
        const chop_length = 50;
        let dots = txt.length > chop_length ? "..." : "";
        return txt.slice(0, 50) + dots;
    };
    const foldNotes = () => {
        setCollapsed(!collapsed);
        // console.log(collapsed);
    };

    return (
        <>
            {currentSectionHeading && (
                <div
                    className={clsx(
                        "flex-col rounded shadow",
                        "rounded-l-sm border-l border-blue-500 dark:border-blue-500",
                        "bg-gray-50 dark:bg-zinc-600/20",
                        className
                    )}
                >
                    <div>
                        <div
                            className={clsx(
                                "flex h-auto w-full text-left items-center justify-between p-4",
                                generalTextStyle
                            )}
                            onClick={foldNotes}
                        >
                            <div className="flex items-center">
                                NOTES | {notesHeading}
                            </div>
                            {collapsed ? (
                                <MdExpandMore className="size-6" />
                            ) : (
                                <MdExpandLess className="size-6" />
                            )}
                        </div>

                        <div className={clsx("mt-0 px-2 pt-0")}>
                            <textarea
                                value={text}
                                onChange={handleInputChange}
                                className={clsx(
                                    "w-full p-0 px-1 bg-transparent focus:outline-none",
                                    notesStyle,
                                    collapsed && "hidden",
                                    "delay-300 transition"
                                )}
                                rows={lines}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Notes;
