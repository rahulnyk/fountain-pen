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
            // if the element is one of the headings.
            const next_path = Path.next(path);
            const next_entry = Editor.node(editor, next_path);
            if (!next_entry) {
                // if there is no next entry, add a para element.
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
                // if there is a element after the current element.
                const [next_node, next_path] = next_entry;
                if (
                    Element.isElement(next_node) &&
                    next_node.type === "paragraph"
                ) {
                    // if that element is a paragraph then return.
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
