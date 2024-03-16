"use client";
// ArticleEditor.tsx

import { useEffect } from "react";
import { useSlate } from "slate-react";
import { useState } from "react";
import { Node, Transforms } from "slate";
import { CustomBaseElement } from "./types";
import { notesStyle } from "./typography";
import Notes from "./notes";

const SidePanel = () => {
    const editor = useSlate();

    const [text, setText] = useState<string>("");

    const handleInputChange = (event: any) => {
        setText(event.target.value);
        Transforms.setNodes(
            editor,
            { notes: [text] },
            { at: editor.getCurrentNodePath() }
        );
    };

    useEffect(() => {
        const { selection } = editor;
        if (!selection) {
            return;
        }
        const node = editor.getCurrentElement();

        if (node && Object.hasOwn(node, "notes")) {
            setText((node as CustomBaseElement).notes[0]);
        } else {
            setText("Notes ... ");
        }
    }, [editor.selection]);

    return (
        <div className="flex-col m-10 mx-18 bg-slate-50">
            <Notes
                text={text}
                onChange={handleInputChange}
                textStyle={notesStyle}
            />
        </div>
    );
};

export default SidePanel;
