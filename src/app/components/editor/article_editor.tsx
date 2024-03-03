// ArticleEditor.tsx

import { useState, useMemo, useCallback, ChangeEvent, useEffect } from "react";
import pipe from "lodash/fp/pipe";
import { withEditableVoids } from "./plugins";
import {
    createEditor,
    Transforms,
    Editor,
    BaseEditor,
    Descendant,
    Element,
} from "slate";
import { Slate, Editable, withReact, ReactEditor } from "slate-react";
import {
    CustomText,
    CustomElement,
    CustomElementProps,
    LeafProps,
    NotesElement,
    EmptyText,
} from "./types";
import { ElementNode, LeafNode } from "./renderers";
import { withHistory, HistoryEditor } from "slate-history";

const createEditorWithPlugins = pipe(withReact, withHistory, withEditableVoids);

declare module "slate" {
    interface CustomTypes {
        Editor: BaseEditor & ReactEditor & HistoryEditor;
        Element: CustomElement;
        Text: CustomText | EmptyText;
    }
}

const saveToLocalStorage = (value: Descendant[]) => {
    const content = JSON.stringify(value);
    localStorage.setItem("editorContent", content);
};

const loadFromLocalStorage = (): Descendant[] | null => {
    const content = localStorage.getItem("editorContent");
    // console.log("Content Load", content);
    return content? JSON.parse(content): null;
};

const ArticleEditor = () => {
    const editor = useMemo(() => createEditorWithPlugins(createEditor()), []);

    const [value, setValue] = useState<Descendant[]>(loadFromLocalStorage() || [
        {
            type: "title",
            children: [{ text: "Your Article Heading" }],
        },        {
            type: "paragraph",
            children: [{ text: "Start writing your article..." }],
        },
    ]);

    useEffect(() => {
        saveToLocalStorage(value);
      }, [value]);


    const renderElement = useCallback(
        (props: CustomElementProps) => <ElementNode {...props} />,
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
                className="focus:outline-none ml-8 mr-8"
            />
        </Slate>
    );
};

const handleKeyDown = (event: React.KeyboardEvent, editor: Editor) => {
    // console.log(editor);
    if (event.key === "Enter") {
        event.preventDefault();
        Transforms.insertNodes(editor, {
            type: "paragraph",
            children: [{ text: "" }],
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
            case "n": {
                insertNotes(editor);
                break;
            }
            default: {
                break;
            }
        }
    }
};

const insertNotes = (editor: Editor) => {
    const notes: NotesElement = {
        type: "notes",
        children: [{ text: "" }],
        notes: "",
    };
    Transforms.insertNodes(editor, notes);
    Transforms.insertNodes(editor, {
        type: "paragraph",
        children: [{ text: "" }],
    });
};

export default ArticleEditor;
