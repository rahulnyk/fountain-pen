import { Transforms, Element, Node, Editor, Path } from "slate";

export const withOnlyOneTitle = (editor: Editor) => {
    const { normalizeNode } = editor;

    editor.normalizeNode = (entry) => {
        const [node, path] = entry;
        const isTitlePath = path.length == 1 && path[0] == 0;
        if (Element.isElement(node) && !isTitlePath) {
            if (node.type == "title") {
                const newProperties: Partial<Element> = { type: "paragraph" };
                Transforms.setNodes<Element>(editor, newProperties, {
                    at: path,
                });
            }
            return;
        }

        normalizeNode(entry);
    };

    return editor;
};
