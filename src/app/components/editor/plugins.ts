import { Editor } from "slate";

export const withSection = (editor: Editor): Editor => {
    const { isVoid } = editor;
  
    editor.isVoid = (element) =>
      element.type === 'section' ? true : isVoid(element);
  
    return editor;
  }