import { Editor, Transforms, Range } from "slate";
import { Element } from "slate";
import { HeadingElement, HeadingTypes, headings, editorModes } from "../types";

export const withCustomBehavior = (editor: Editor) => {
    // editor.editorMode = "edit";

    // editor.toggleEditorMode = () => {
    //     let mode: editorModes = "edit";
    //     if (editor.editorMode === "edit") {
    //         mode = "outline";
    //     }
    //     if (editor.editorMode === "outline") {
    //         mode = "readonly";
    //     }
    //     if (editor.editorMode === "readonly") {
    //         mode = "edit";
    //     }
    //     editor.editorMode = mode;
    // };

    editor.getCurrentNode = () => {
        const [node] = Editor.parent(editor, editor.selection || []);
        return node;
    };

    editor.getCurrentNodePath = () => {
        const [, path] = Editor.parent(editor, editor.selection || []);
        return path;
    };

    editor.isCollapsed = () => {
        const { selection } = editor;
        return !!(selection && Range.isCollapsed(selection));
    };

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
        return headings.includes((element as HeadingElement).type);
    };

    // This method makes sure that when the user presses the back button, the headings are not deleted.
    // const { deleteBackward } = editor;
    // editor.deleteBackward = (unit) => {
    //     const { selection } = editor;

    //     if (!selection) {
    //         return deleteBackward(unit);
    //     }

    //     if (editor.isCurrentNodeHeadding()) {
    //         // If the current node is a heading, move the focus to the previous section
    //         const previousSection = Editor.previous(editor, {
    //             at: selection.focus.path,
    //         });

    //         if (previousSection) {
    //             const [, prevSectionPath] = previousSection;
    //             Transforms.select(editor, prevSectionPath);
    //         }
    //     } else {
    //         // If the current node is a paragraph, resume normal delete behavior
    //         deleteBackward(unit);
    //     }
    // };

    return editor;
};

// Use CustomBehaviorEditor in your application
