import { Editor, Transforms, Range, Path, BaseRange } from "slate";
import { Element, NodeEntry } from "slate";
import {
    CustomBaseElement,
    CustomElement,
    CustomText,
    HeadingElement,
    HeadingTypes,
    Headings,
    editorModes,
} from "../types";
import { BaseSelection, Node } from "slate";

export const withCustomBehavior = (editor: Editor) => {
    /**
     * Is the current editor selection a range, that is the focus and the anchor are different?
     *
     * @returns {boolean} true if the current selection is a range.
     */
    editor.isSelectionExpanded = (): boolean => {
        return editor.selection ? Range.isExpanded(editor.selection) : false;
    };

    /**
     * Returns true if current selection is collapsed, that is there is no selection at all
     * (the focus and the anchor are the same).
     *
     * @returns {boolean} true if the selection is collapsed
     */
    editor.isSelectionCollapsed = (): boolean => {
        return !editor.isSelectionExpanded();
    };

    /**
     * Returns the first node at the current selection
     */
    editor.getCurrentNode = () => {
        if (editor.selection) {
            const [node, path] = Editor.node(editor, editor.selection);
            return node;
        }
    };

    editor.getCurrentNodePath = () => {
        const [, path] = Editor.parent(editor, editor.selection || [0]);
        return path;
    };

    editor.getElementText = (element) => {
        if (!Element.isElement(element)) {
            return undefined;
        }

        let text = element.children
            .map((child) => (child as CustomText).text)
            .join("");
        return text;
    };

    editor.getCurrentElementType = () => {
        const [entry] = Editor.nodes(editor, {
            match: (n) => Element.isElement(n),
        });
        const [element] = entry;
        return (element as Element).type;
    };

    editor.getSelectedText = (anchorOffset = 0, focusOffset?: any): string => {
        const { selection } = editor;

        if (selection) return Editor.string(editor, selection);

        return "";
    };

    editor.getCurrentElement = () => {
        const { selection } = editor;

        if (!selection || editor.isSelectionExpanded()) return undefined;

        const [entry] = Editor.nodes(editor, {
            at: selection,
            match: (n) => Element.isElement(n),
        });
        // const [element, path] = entry;
        return entry;
    };

    editor.isCurrentNodeHeading = () => {
        const selection = editor.selection;
        if (!selection) {
            return false;
        }
        const [heading_node] = Editor.nodes(editor, {
            at: selection,
            match: (n) =>
                Element.isElement(n) && Headings.some((t) => n.type === t),
        });
        if (heading_node) {
            return true;
        }
        return false;
    };

    /**
     *
     * @param types one of the types of element nodes, like paragraph, heading1 etc
     * @param at the selection, if not provided, current selection is used.
     * @returns Node entry of the previous element with given type.
     */

    editor.getPreviousSibling = (types: string[], at?: BaseSelection) => {
        const selection = at ? at : editor.selection;

        if (!selection) return undefined;

        const [entry] = Editor.nodes(editor, {
            at: selection,
            match: (n) => Element.isElement(n),
        });

        const [node, path] = entry;

        if (path.length === 0) {
            return;
        }

        const parentPath = path.slice(0, path.length - 1);
        const currentSiblingNumber = path[path.length - 1];

        for (let i = currentSiblingNumber; i >= 0; i--) {
            const entry = Editor.node(editor, parentPath.concat(i));
            const [n, p] = entry;
            if (Element.isElement(n) && types.some((t) => n.type === t)) {
                return entry;
            }
        }
    };

    /**
     * This method returns the text from the current section.
     * Current section being the immediately proceeding heading
     * and paragraphs till the next heading.
     * @param at: Selection, if not provided, current selection is used.
     * @returns
     */

    editor.getCurrentSectionText = (at?: BaseSelection) => {
        const selection = at ? at : editor.selection;
        if (!selection || editor.isSelectionExpanded()) {
            return undefined;
        }
        const sectionHeadingEntry = editor.getPreviousSibling(
            [...Headings],
            selection
        );
        if (!sectionHeadingEntry) {
            return undefined;
        }
        const [, hp] = sectionHeadingEntry;
        const basePath = hp.slice(0, hp.length - 1);
        const currentHeadingIndex = hp[hp.length - 1];
        let i = currentHeadingIndex + 1;
        let text: string = "";
        let nextPath = basePath.concat(i);
        while (Editor.hasPath(editor, nextPath)) {
            let [n] = Editor.node(editor, nextPath);
            if (Headings.some((t) => (n as CustomBaseElement).type === t)) {
                break;
            }
            text = text.concat(Node.string(n), "\n\n");
            nextPath = basePath.concat(++i);
        }
        return text;
    };

    editor.getCurrentSectionNotes = (at?: BaseSelection) => {
        const selection = at ? at : editor.selection;
        if (!selection || editor.isSelectionExpanded()) {
            return undefined;
        }
        const sectionHeadingEntry = editor.getPreviousSibling(
            [...Headings],
            selection
        );
        if (!sectionHeadingEntry) {
            return undefined;
        }
        const [hn] = sectionHeadingEntry;
        const notes = (hn as HeadingElement).notes.join("\n");
        return notes;
    };

    editor.getTitleString = () => {
        const [title] = editor.children;
        return title ? Node.string(title) : undefined;
    };
    editor.getTitleNotes = () => {
        const [title] = editor.children;
        let notes: string | undefined = undefined;
        if (Element.isElement(title)) {
            notes = title.notes.join("\n");
        }
        return notes ? notes : undefined;
    };
    return editor;
};

// Use CustomBehaviorEditor in your application
