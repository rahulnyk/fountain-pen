// ArticleEditor.tsx

import { useState, useMemo, useCallback, ChangeEvent } from "react";
import pipe from "lodash/fp/pipe";
import { withSection } from "./plugins";
import {
    createEditor,
    Transforms,
    Editor,
    BaseEditor,
    Descendant,
    Element,
} from "slate";
import { Slate, Editable, withReact, ReactEditor } from "slate-react";
import { CustomText, CustomElement, ElementProps, LeafProps } from "./types";
import { ElementNode, LeafNode } from "./nodes";
import { withHistory } from "slate-history";

const createEditorWithPlugins = pipe(withReact, withHistory, withSection);

declare module "slate" {
    interface CustomTypes {
        Editor: BaseEditor & ReactEditor;
        Element: CustomElement;
        Text: CustomText;
    }
}

const ArticleEditor = () => {
    const editor = useMemo(() => createEditorWithPlugins(createEditor()), []);

    const [value, setValue] = useState<Descendant[]>([
        {
            type: "title",
            children: [{ text: "Your Article Heading" }],
        },
        {
            type: "paragraph",
            children: [{ text: "Start writing your article..." }],
        },
    ]);

    const renderElement = useCallback(
        (props: ElementProps) => <ElementNode {...props} />,
        []
    );

    const renderLeaf = useCallback(
        (props: LeafProps) => <LeafNode {...props} />,
        []
    );

    return (
        <Slate
            editor={editor}
            initialValue={value}
            onChange={(newValue) => setValue(newValue)}
        >
            <Editable
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                onKeyDown={(event) => handleKeyDown(event, editor)}
                className="focus:outline-none"
            />
        </Slate>
    );
};

const handleKeyDown = (event: React.KeyboardEvent, editor: Editor) => {
    if (event.key === "Enter") {
        event.preventDefault();
        Transforms.insertNodes(editor, {
            type: "paragraph",
            children: [{ text: "" }],
        });
    }
    if (event.key === "1" && event.ctrlKey) {
        event.preventDefault();
        Transforms.setNodes(
            editor,
            { type: "heading1" },
            { match: (n) => Element.isElement(n) && Editor.isBlock(editor, n) }
        );
    }
    if (event.key === "2" && event.ctrlKey) {
        event.preventDefault();
        Transforms.setNodes(
            editor,
            { type: "heading2" },
            { match: (n) => Element.isElement(n) && Editor.isBlock(editor, n) }
        );
    }
    if (event.key === "3" && event.ctrlKey) {
        event.preventDefault();
        Transforms.setNodes(
            editor,
            { type: "heading3" },
            { match: (n) => Element.isElement(n) && Editor.isBlock(editor, n) }
        );
    }
    if (event.key === "0" && event.ctrlKey) {
        event.preventDefault();
        Transforms.setNodes(
            editor,
            { type: "paragraph" },
            { match: (n) => Element.isElement(n) && Editor.isBlock(editor, n) }
        );
    }
    // if (event.key === "-" && event.ctrlKey) {
    //     event.preventDefault();
    //     Transforms.insertNodes(editor, {
    //         type: "section",
    //         children: [{ text: "" }],
    //     });
    // }
};

export default ArticleEditor;
