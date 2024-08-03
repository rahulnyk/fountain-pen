import { Editor } from "slate";
import { EmptyText, Marks } from "../types";
import { CustomText } from "../types";

export const withMarksUtils = (editor: Editor) => {
    editor.toggleMark = (mark: Marks) => {
        const existing_marks = Editor.marks(editor);

        const isActive = existing_marks
            ? (existing_marks as CustomText)[mark] === true
            : false;

        if (isActive) {
            Editor.removeMark(editor, mark);
        } else {
            Editor.addMark(editor, mark, true);
        }
    };

    return editor;
};
