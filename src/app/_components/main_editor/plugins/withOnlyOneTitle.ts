import { Transforms, Element, Node, Editor, Path } from "slate";

export const withOnlyOneTitle = (editor: Editor) => {
    const { normalizeNode } = editor;

    editor.normalizeNode = (entry) => {
        const [node, path] = entry;
        const isTitlePath = path.length == 1 && path[0] == 0;
        // if path is title path then set the node to title.
        // if path is not title path then ensure it is not a title.
        if (Element.isElement(node)) {
            if (isTitlePath) {
                if (node.type != "title") {
                    const newProperties: Partial<Element> = { type: "title" };
                    Transforms.setNodes<Element>(editor, newProperties, {
                        at: path,
                    });
                }
            }
            if (!isTitlePath) {
                if (node.type == "title") {
                    const newProperties: Partial<Element> = {
                        type: "paragraph",
                    };
                    Transforms.setNodes<Element>(editor, newProperties, {
                        at: path,
                    });
                }
            }
            return;
        }

        normalizeNode(entry);
    };

    return editor;
};
