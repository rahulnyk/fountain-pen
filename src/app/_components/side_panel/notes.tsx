import { useEffect, useState } from "react";
import { useSlate } from "slate-react";
import { Transforms, Node } from "slate";
import { CustomBaseElement } from "../main_editor/types";
import { notesStyle } from "../main_editor/typography";
import clsx from "clsx";

const Notes = ({ className }: { className?: string }) => {
    const editor = useSlate();

    const [lines, setLines] = useState<number>(2);
    const [text, setText] = useState<string>("");
    const [notesHeading, setNotesHeading] = useState<string>("");
    const [currentElement, setCurrentElement] = useState<Node>();
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        setLines(text ? Math.min((text.match(/\n/g) || "").length + 1, 15) : 2);
    }, [text]);

    // text area helpers

    const handleInputChange = (event: any) => {
        setText(event.target.value);
        Transforms.setNodes(
            editor,
            { notes: [text] },
            { at: editor.getCurrentNodePath() }
        );
        // console.log(element);
    };

    useEffect(() => {
        const { selection } = editor;
        if (!selection) {
            setCurrentElement(undefined);
            return;
        }
        const node = editor.getCurrentElement();
        setCurrentElement(node);

        if (node && Object.hasOwn(node, "notes")) {
            setText((node as CustomBaseElement).notes[0]);
            setNotesHeading(chop(editor.getCurrentElementText()));
        } else {
            setText("Notes ... ");
            setNotesHeading("");
        }
    }, [editor.selection]);

    const chop = (txt: string): string => {
        const chop_length = 50;
        let dots = txt.length > 50 ? "..." : "";
        return txt.slice(0, 50) + dots;
    };
    const foldNotes = () => {
        setCollapsed(!collapsed);
        console.log(collapsed);
    };

    return (
        <>
            {!((currentElement as CustomBaseElement)?.type === "paragraph") && (
                <div
                    className={clsx(
                        "flex-col bg-indigo-50 border-l-4 border-indigo-600 rounded shadow-sm",
                        className,
                        collapsed && "h-10",
                        "transition-all ease-in-out duration-150"
                    )}
                >
                    <div>
                        <div
                            className="flex h-auto w-full text-left text-xs items-center p-4 text-indigo-300"
                            onClick={foldNotes}
                        >
                            NOTES | {notesHeading}
                        </div>

                        <div className={clsx("mt-0 px-2 pt-0 text-gray-700")}>
                            <textarea
                                value={text}
                                onChange={handleInputChange}
                                className={clsx(
                                    "w-full p-0 px-1 bg-indigo-50 focus:outline-none",
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
