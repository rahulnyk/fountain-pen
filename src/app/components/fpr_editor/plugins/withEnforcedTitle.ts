import { HeadingElement, ParagraphElement } from "../types";
import { Transforms, Node, Element as SlateElement, Editor, Path } from "slate";

export const withEnforcedTitle = (editor: Editor) => {
    const { normalizeNode } = editor;

    editor.normalizeNode = ([node, path]: [node: Node, path: Path]) => {
        if (path.length === 0) {
            if (
                editor.children.length <= 1 &&
                Editor.string(editor, [0, 0]) === ""
            ) {
                const title: HeadingElement = {
                    type: "title",
                    children: [{ text: "Title" }],
                };
                Transforms.insertNodes(editor, title, {
                    at: path.concat(0),
                    select: true,
                });
            }

            if (editor.children.length < 2) {
                const paragraph: ParagraphElement = {
                    type: "paragraph",
                    children: [{ text: "" }],
                };
                Transforms.insertNodes(editor, paragraph, {
                    at: path.concat(1),
                });
            }

            for (const [child, childPath] of Node.children(editor, path)) {
                let type: string;
                const slateIndex = childPath[0];
                const enforceType = (type: any) => {
                    if (SlateElement.isElement(child) && child.type !== type) {
                        const newProperties: Partial<SlateElement> = { type };
                        Transforms.setNodes<SlateElement>(
                            editor,
                            newProperties,
                            {
                                at: childPath,
                            }
                        );
                    }
                };

                switch (slateIndex) {
                    case 0:
                        type = "title";
                        enforceType(type);
                        break;
                    case 1:
                        type = "paragraph";
                        enforceType(type);
                    default:
                        break;
                }
            }
        }

        return normalizeNode([node, path]);
    };

    return editor;
};
