"use client";
// ArticleEditor.tsx

import { useCallback } from "react";
import { Transforms, Editor, Element } from "slate";
import { Editable } from "slate-react";
import { CustomElementProps, LeafProps } from "./types";
import { ElementNode, LeafNode } from "./renderers";

const MainEditor = ({ editor }: { editor: Editor }) => {
    const renderElement = useCallback(
        (props: CustomElementProps) => <ElementNode {...props} />,
        []
    );

    const renderLeaf = useCallback(
        (props: LeafProps) => <LeafNode {...props} />,
        []
    );

    return (
        <div className="pt-14 ml-10 mr-5">
            <div className="">
                <Editable
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    onKeyDown={(event) => handleKeyDown(event, editor)}
                    className="focus:outline-none"
                    readOnly={false}
                />
            </div>
        </div>
    );
};

const handleKeyDown = (event: React.KeyboardEvent, editor: Editor) => {
    console.log(editor.isCurrentNodeHeading());
    if (event.shiftKey && event.key === "Enter") {
        event.preventDefault();
        editor.insertText("\n");
    }
    if (event.key === "Enter" && editor.isCurrentNodeHeading()) {
        event.preventDefault();
        Transforms.insertNodes(editor, {
            type: "paragraph",
            children: [{ text: "" }],
            notes: [],
        });
    }
    if (event.ctrlKey) {
        event.preventDefault();
        switch (event.key) {
            case "1":
                Transforms.setNodes(editor, { type: "heading1" });
                break;
            case "2":
                Transforms.setNodes(editor, { type: "heading2" });
                break;
            case "3":
                Transforms.setNodes(editor, { type: "heading3" });
                break;
            case "`":
            case "0":
                Transforms.setNodes(editor, { type: "paragraph" });
                break;
            case "b":
                if (!editor.isCurrentNodeHeading()) {
                    event.preventDefault();
                    editor.toggleMark("bold");
                }
                break;
            case "i":
                if (!editor.isCurrentNodeHeading()) {
                    event.preventDefault();
                    editor.toggleMark("italic");
                }
                break;
            case "u":
                if (!editor.isCurrentNodeHeading()) {
                    event.preventDefault();
                    editor.toggleMark("underline");
                }
                break;
            default:
                break;
        }
    }
};

export default MainEditor;
