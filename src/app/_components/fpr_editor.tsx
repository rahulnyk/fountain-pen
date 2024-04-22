"use client";
// ArticleEditor.tsx

import { useState, useMemo, useEffect, useCallback } from "react";
import pipe from "lodash/fp/pipe";
import { withEditableVoids } from "./main_editor/plugins/withEditableVoids";
import { withParaAfterHeadings } from "./main_editor/plugins/withParaAfterHeadings";
import { createEditor, Descendant } from "slate";
import { Slate, withReact } from "slate-react";
import { withHistory } from "slate-history";
import { withCustomBehavior } from "./main_editor/plugins/withCustomBehavior";
// import { withEnforcedTitle } from "./main_editor/plugins/withEnforcedTitle";
import { withOnlyOneTitle } from "./main_editor/plugins/withOnlyOneTitle";
import {
    backupArticleContent,
    getArticleContent,
    getBackupContent,
    saveArticleContent,
} from "../_actions/ldb";
import debounce from "lodash/debounce";
import MainEditor from "./main_editor";
import SidePanel from "./side_panel";
import clsx from "clsx";
import { ToolBar } from "./navbar/toolbar";

const createEditorWithPlugins = pipe(
    // withEnforcedTitle,
    withParaAfterHeadings,
    withOnlyOneTitle,
    withCustomBehavior,
    withEditableVoids,
    withReact,
    withHistory
);

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

    const editor = useMemo(() => createEditorWithPlugins(createEditor()), []);

    const [value, setValue] = useState<Descendant[]>(fallbackValue);

    useEffect(() => {
        // Load from server
        const getContent = async () => {
            let content = await getArticleContent({ id: 0 });
            if (!content) {
                // check backup article content.
                content = await getBackupContent({ id: 0 });
            }
            const contentValue = content ? content : fallbackValue;
            setValue(contentValue);
            setWinReady(true);
        };
        getContent();
    }, []);

    const debouncedSave = useCallback(
        debounce((value) => {
            saveArticleContent(value);
        }, 1000),
        []
    );

    const debounceBackup = useCallback(
        debounce((value) => {
            backupArticleContent(value);
        }, 3000),
        []
    );

    function saveOnChange(value: Descendant[]) {
        debouncedSave({ content: value });
        debounceBackup({ content: value });
    }

    return (
        <>
            {winReady && (
                <Slate
                    editor={editor}
                    initialValue={value}
                    onChange={saveOnChange}
                >
                    <ToolBar />
                    <div className="flex h-auto flex-grow">
                        {/* First Column (2/3 width) */}
                        <div className={clsx("w-2/3 z-0")}>
                            {/* <SaveBadge /> */}
                            <MainEditor editor={editor} />
                        </div>

                        {/* Second Column (1/3 width) */}
                        <SidePanel />
                    </div>
                </Slate>
            )}
        </>
    );
};

export default FprEditor;
