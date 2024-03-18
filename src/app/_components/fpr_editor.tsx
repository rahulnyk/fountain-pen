"use client";
// ArticleEditor.tsx

import { useState, useMemo, useEffect } from "react";
import pipe from "lodash/fp/pipe";
import { withEditableVoids } from "./main_editor/plugins/withEditableVoids";
import { withParaAfterHeadings } from "./main_editor/plugins/withParaAfterHeadings";
import { createEditor, Descendant } from "slate";
import { Slate, withReact } from "slate-react";
import { withHistory } from "slate-history";
import { withCustomBehavior } from "./main_editor/plugins/withCustomBehavior";
import { withEnforcedTitle } from "./main_editor/plugins/withEnforcedTitle";
import { withOnlyOneTitle } from "./main_editor/plugins/withOnlyOneTitle";

const createEditorWithPlugins = pipe(
    withEnforcedTitle,
    withParaAfterHeadings,
    withOnlyOneTitle,
    withCustomBehavior,
    withEditableVoids,
    withReact,
    withHistory
);

import MainEditor from "./main_editor";
import SidePanel from "./side_panel";

const localContentKey = "localEditorContent";

const fallbackValue: Descendant[] = [
    {
        type: "title",
        children: [{ text: "Your Article Heading" }],
        notes: [""],
    },
    {
        type: "paragraph",
        children: [{ text: "Start writing your article..." }],
        notes: [""],
    },
];
const FprEditor = () => {
    const [winReady, setWinReady] = useState(false);

    useEffect(() => {
        setWinReady(true);
    }, []);

    const editor = useMemo(() => createEditorWithPlugins(createEditor()), []);

    const [value, setValue] = useState<Descendant[]>(fallbackValue);

    useEffect(() => {
        const stored = localStorage.getItem(localContentKey);
        const content = stored ? JSON.parse(stored) : fallbackValue;
        setValue(content);
        editor.children = content;
    }, []);

    const saveOnChange = (value: Descendant[]) => {
        const content = JSON.stringify(value);
        localStorage.setItem(localContentKey, content);
    };

    return (
        <>
            {winReady && (
                <Slate
                    editor={editor}
                    initialValue={value}
                    onChange={saveOnChange}
                >
                    <div className="flex h-screen flex-grow">
                        {/* First Column (2/3 width) */}
                        <div className="w-2/3 bg-white overflow-y-auto">
                            <MainEditor editor={editor} />
                        </div>

                        {/* Second Column (1/3 width) */}
                        <div className="w-1/3 bg-gray-50 overflow-y-auto">
                            <SidePanel />
                        </div>
                    </div>
                </Slate>
            )}
        </>
    );
};

export default FprEditor;
