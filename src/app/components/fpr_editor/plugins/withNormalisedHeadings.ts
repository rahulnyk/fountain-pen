import { Transforms, Element, Node, Editor, Path } from "slate";
import { Headings } from "../types";

export const withNormalisedHeadings = (editor: Editor) => {
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
                Transforms.insertNodes(
                    editor,
                    { type: "paragraph", children: [{ text: "" }] },
                    { at: [editor.children.length] }
                );
                return;
            } else {
                const [next_node, next_path] = next_entry;
                if (
                    Element.isElement(next_node) &&
                    next_node.type === "paragraph"
                ) {
                    return;
                } else {
                    Transforms.insertNodes(
                        editor,
                        { type: "paragraph", children: [{ text: "" }] },
                        { at: next_path }
                    );
                    return;
                }
            }
        }

        normalizeNode(entry);
    };

    return editor;
};
