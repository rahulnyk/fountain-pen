// import { Text } from "slate";
import { RenderElementProps, RenderLeafProps } from "slate-react";
import { ReactNode } from "react";
import {
    Descendant,
    BaseEditor,
    Ancestor,
    Path,
    Node,
    NodeEntry,
    BaseRange,
    BaseSelection,
} from "slate";
import { ReactEditor } from "slate-react";
import { HistoryEditor } from "slate-history";
import { Editor } from "slate";
import { withMarksUtils } from "./plugins/withMarksUtils";

export const editorModeValues = ["readonly", "outline", "edit"] as const;

export type editorModes = (typeof editorModeValues)[number];

export interface FprEditor extends ReactEditor {
    getCurrentNodePath(): Path;
    getSelectedText(): string;
    getCurrentElementType(): string | undefined;
    getCurrentNode(): Node | undefined;
    getCurrentElement(): NodeEntry | undefined;
    getSelectedText(): string;
    getElementText(element: CustomBaseElement): string | undefined;
    isSelectionExpanded(): boolean;
    isSelectionCollapsed(): boolean;
    getPreviousSibling(
        types: HeadingTypes[],
        at?: BaseSelection
    ): NodeEntry | undefined;
    getCurrentSectionNotes(at?: BaseSelection): string | undefined;
    getCurrentSectionText(at?: BaseSelection): string | undefined;
    getTitleString(): string | undefined;
    getTitleNotes(): string | undefined;
    isCurrentNodeHeading(): boolean;
    // Marks utilities
    toggleMark(mark: Marks): void;
}
export type CustomEditor = ReactEditor & HistoryEditor & FprEditor;

export type CustomElement =
    | ParagraphElement
    | TitleElement
    | Heading1Element
    | Heading2Element
    | Heading3Element;

export type CustomDescendant = Descendant | CustomText | EmptyText;

// Custom text types
export type CustomText = {
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    text: string;
};

export type Marks = keyof Omit<CustomText, "text">;

export type EmptyText = { text: string };

// Editable void type
export type EditableVoidElement = {
    type: "editable-void";
    children: EmptyText[];
};
export type NotesElement = Omit<EditableVoidElement, "type"> & {
    type: "notes";
    notes: string;
};

// Basic Types of elements that are displayed on the editor. This does not include the 'notes' type
export const Headings = ["title", "heading1", "heading2", "heading3"] as const;

export const HeadingsWithoutTitle = [
    "heading1",
    "heading2",
    "heading3",
] as const;

export type HeadingTypes = (typeof Headings)[number];

export type ElementTypes = HeadingTypes | "paragraph"; //| "quoted" | "item-list";

// Base Element type
export type CustomBaseElement = {
    type: ElementTypes;
    children: CustomDescendant[];
    notes: string[];
};
export type ParagraphElement = Omit<CustomBaseElement, "type" | "children"> & {
    type: "paragraph";
    align?: string;
    children: CustomText[];
};

export type HeadingElement = Omit<CustomBaseElement, "type"> & {
    type: HeadingTypes;
};

export type TitleElement = HeadingElement & { type: "title" };

export type Heading1Element = HeadingElement & {
    type: "heading1";
};
export type Heading2Element = HeadingElement & {
    type: "heading2";
};
export type Heading3Element = HeadingElement & {
    type: "heading3";
};

export interface CustomElementProps extends RenderElementProps {
    element: CustomElement;
}

export type LeafProps = {
    leaf: CustomText;
    text: CustomText;
} & RenderLeafProps;

export interface BasicWrapperProps {
    children: ReactNode;
    className?: string;
}

declare module "slate" {
    interface CustomTypes {
        Editor: BaseEditor & ReactEditor & HistoryEditor & FprEditor;
        Element: CustomElement;
        Text: CustomText | EmptyText;
    }
}
