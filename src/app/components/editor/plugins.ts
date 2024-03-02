import { Editor } from "slate";


export const withEditableVoids = (editor: Editor) => {
    const voidElements = ["notes", "sections"];
    const { isVoid } = editor;

    editor.isVoid = (element) => {
        return voidElements.includes(element.type) ? true : isVoid(element);
    };

    return editor;
};
