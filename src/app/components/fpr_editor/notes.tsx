import { BlockquoteHTMLAttributes, EventHandler, useEffect } from "react";
import { useState } from "react";
import { useSlate } from "slate-react";
import { Transforms, Node } from "slate";
import { CustomBaseElement } from "./types";
import { notesStyle } from "./typography";

const Notes = ({ className }: { className: string }) => {
    const editor = useSlate();

    const [lines, setLines] = useState<number>(2);
    const [text, setText] = useState<string>("");
    const [notesHeading, setNotesHeading] = useState<string>("");
    const [currentElement, setCurrentElement] = useState<Node>();

    useEffect(() => {
        setLines(text ? (text.match(/\n/g) || "").length + 1 : 2);
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
            setNotesHeading(
                editor.getCurrentElementText().slice(0, 30) + "..."
            );
        } else {
            setText("Notes ... ");
            setNotesHeading("");
        }
    }, [editor.selection]);

    return (
        <>
            <div
                className={`flex-col h-auto  bg-blue-50 rounded shadow-sm p-0 ${
                    !(
                        (currentElement as CustomBaseElement)?.type ===
                        "paragraph"
                    )
                        ? "visible"
                        : "invisible"
                } ${className}`}
            >
                <button className="h-6 rounded-t overflow-hidden mt-t mx-0 w-full text-xs text-left pl-2 text-white bg-gradient-to-l from-indigo-400 via-indigo-400 to-indigo-600">
                    {notesHeading}
                </button>

                <div className="mt-0 p-2 text-gray-600">
                    <textarea
                        value={text}
                        onChange={handleInputChange}
                        className={`w-full p-2 bg-blue-50 focus:outline-none ${notesStyle}`}
                        rows={lines}
                    />
                </div>
            </div>
        </>
    );
};

export default Notes;
