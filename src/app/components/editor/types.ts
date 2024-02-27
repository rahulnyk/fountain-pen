import { Text } from "slate";
import { RenderElementProps, RenderLeafProps } from "slate-react";
import { ReactNode } from "react";

export type CustomText = {
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    text: string;
};

export type CustomElement =
    | { type: "title"; children: Text[] }
    | { type: "paragraph"; children: CustomText[] }
    | { type: "heading1"; children: Text[] }
    | { type: "heading2"; children: Text[] }
    | { type: "heading3"; children: Text[] }
    | { type: "section"; children: Text[] };

export interface ElementProps extends RenderElementProps {
    element: CustomElement;
}

export type LeafProps = { leaf: CustomText; text: CustomText } & RenderLeafProps;

export  interface BasicWrapperProps {
    children: ReactNode;
    className?: string;
}

