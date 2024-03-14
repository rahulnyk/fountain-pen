// import { Text } from "slate";
import { RenderElementProps, RenderLeafProps } from "slate-react";
import { ReactNode } from "react";
import { Descendant, BaseEditor, Ancestor, Path } from "slate";
import { ReactEditor } from "slate-react";
import { HistoryEditor } from "slate-history";

export const editorModeValues = ["readonly", "outline", "edit"] as const;

export type editorModes = (typeof editorModeValues)[number];

export interface FprEditor extends ReactEditor {
    getCurrentNodePath(): Path;
    isCollapsed(): boolean;
    getSelectedText(): string;
    getCurrentElementType(): string | undefined;
    getCurrentNode(): Ancestor;
    isCurrentNodeHeadding(): boolean;
    // editorMode: editorModes;
    // toggleEditorMode(): void;
}
export type CustomEditor = ReactEditor & HistoryEditor & FprEditor;

export type CustomElement =
    | NotesElement
    | ParagraphElement
    | TitleElement
    | Heading1Element
    | Heading2Element
    | Heading3Element;

export type CustomDescendant = Descendant | CustomText | EmptyText;

export type CustomText = {
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    text: string;
};

export type EditableVoidElement = {
    type: "editable-void";
    children: EmptyText[];
};
export type NotesElement = Omit<EditableVoidElement, "type"> & {
    type: "notes";
    notes: string;
};

export type EmptyText = { text: string };

// export type BaseElement = {

// }

export type ParagraphElement = {
    type: "paragraph";
    align?: string;
    children: CustomDescendant[];
};

export const Headings = ["title", "heading1", "heading2", "heading3"] as const;

export const HeadingsWithoutTitle = [
    "heading1",
    "heading2",
    "heading3",
] as const;

export type HeadingTypes = (typeof Headings)[number];

export type HeadingElement = Omit<ParagraphElement, "type"> & {
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
