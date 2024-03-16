import { Editor, Transforms, Range } from "slate";
import { Element } from "slate";
import {
    CustomBaseElement,
    HeadingElement,
    HeadingTypes,
    Headings,
    editorModes,
} from "../types";

export const withCustomBehavior = (editor: Editor) => {
    editor.getCurrentNode = () => {
        if (editor.selection) {
            const [node, path] = Editor.node(editor, editor.selection);
            return node;
        }
    };

    editor.getCurrentNodePath = () => {
        const [, path] = Editor.parent(editor, editor.selection || [0]);
        return path;
    };

    editor.isCollapsed = () => {
        const { selection } = editor;
        return !!(selection && Range.isCollapsed(selection));
    };

    editor.getCurrentElement = () => {
        const [entry] = Editor.nodes(editor, {
            match: (n) => Element.isElement(n),
        });
        const [element] = entry;
        return element;
    };

    // editor.getCurrentElementNotes = () => {
    //     const [entry] = Editor.nodes(editor, {
    //         match: (n) => Element.isElement(n),
    //     });
    //     const [element] = entry;
    //     return ["Write your notes here ..."];
    //     // let notes = (element as CustomBaseElement).notes;
    //     // if (notes && notes.length) {
    //     //     return notes;
    //     // } else {
    //     //     notes = ["Write your notes here ..."];
    //     //     Transforms.setNodes(
    //     //         editor,
    //     //         { notes: notes },
    //     //         { at: editor.getCurrentNodePath() }
    //     //     );
    //     //     return notes;
    //     // }
    // };

    editor.getCurrentElementType = () => {
        const [entry] = Editor.nodes(editor, {
            match: (n) => Element.isElement(n),
        });
        const [element] = entry;
        return (element as Element).type;
    };

    editor.isCurrentNodeHeadding = () => {
        const [entry] = Editor.nodes(editor, {
            match: (n) => Element.isElement(n),
        });
        const [element] = entry;
        return Headings.includes((element as HeadingElement).type);
    };

    return editor;
};

// Use CustomBehaviorEditor in your application
