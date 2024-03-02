// import { Text } from "slate";
import { RenderElementProps, RenderLeafProps } from "slate-react";
import { ReactNode } from "react";
import { Descendant } from "slate";

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
export type NotesElement = Omit<EditableVoidElement, "type"> & { type: "notes", notes: string };

export type EmptyText = { text: string };

export type ParagraphElement = {
    type: "paragraph";
    align?: string;
    children: CustomDescendant[];
};
export type TitleElement = Omit<ParagraphElement, "type"> & { type: "title" };
export type Heading1Element = Omit<ParagraphElement, "type"> & {
    type: "heading1";
};
export type Heading2Element = Omit<ParagraphElement, "type"> & {
    type: "heading2";
};
export type Heading3Element = Omit<ParagraphElement, "type"> & {
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
