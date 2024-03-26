import { Transforms, Element, Node, Editor, Path } from "slate";
import { Headings } from "../types";

export const withParaAfterHeadings = (editor: Editor) => {
    const { normalizeNode } = editor;

    editor.normalizeNode = (entry) => {
        const [node, path] = entry;
        // If the element is a heading, ensure is followed by a paragraph.
        if (
            Element.isElement(node) &&
            Headings.some((heading) => node.type === heading)
        ) {
            const next_entry = Editor.next(editor, { at: path });
            if (!next_entry) {
                let paragraph: Node = {
                    type: "paragraph",
                    children: [{ text: "" }],
                    notes: [""],
                };
                Transforms.insertNodes(editor, paragraph, {
                    at: [editor.children.length],
                });
                return;
            } else {
                const [next_node, next_path] = next_entry;
                if (
                    Element.isElement(next_node) &&
                    next_node.type === "paragraph"
                ) {
                    return;
                } else {
                    let paragraph: Node = {
                        type: "paragraph",
                        children: [{ text: "" }],
                        notes: [""],
                    };
                    Transforms.insertNodes(editor, paragraph, {
                        at: next_path,
                    });
                    return;
                }
            }
        }

        normalizeNode(entry);
    };

    return editor;
};
