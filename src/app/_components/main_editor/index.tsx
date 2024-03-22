"use client";
// ArticleEditor.tsx

import { useCallback } from "react";
import { Transforms, Editor } from "slate";
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
        <div className="pt-20 ml-12 mr-12">
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
    if (event.key === "Enter") {
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
            case "1": {
                Transforms.setNodes(editor, { type: "heading1" });
                break;
            }
            case "2": {
                Transforms.setNodes(editor, { type: "heading2" });
                break;
            }
            case "3": {
                Transforms.setNodes(editor, { type: "heading3" });
                break;
            }
            case "0": {
                Transforms.setNodes(editor, { type: "paragraph" });
                break;
            }
            default: {
                break;
            }
        }
    }
};

export default MainEditor;
