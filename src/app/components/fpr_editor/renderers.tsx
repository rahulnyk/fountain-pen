"use client";
import { CustomElementProps, LeafProps, BasicWrapperProps } from "./types";
import { NormalText } from "./element_components/normal_text";
import { Heading } from "./element_components/headings";
import { forwardRef } from "react";

export const ElementNode = forwardRef((props: CustomElementProps, ref) => {
    const { attributes, children, element } = props;
    switch (element.type) {
        case "paragraph":
            return <NormalText {...props} />;
        case "title":
        case "heading1":
        case "heading2":
        case "heading3":
            return <Heading {...props} />;
        default:
            return <NormalText {...props} />;
    }
});

export const LeafNode = ({ attributes, children, leaf }: LeafProps) => {
    let style: React.CSSProperties = {};
    if (leaf.bold) {
        style = { ...style, fontWeight: "bold" };
    }
    if (leaf.italic) {
        style = { ...style, fontStyle: "italic" };
    }
    if (leaf.underline) {
        style = { ...style, textDecoration: "underline" };
    }
    return (
        <span {...attributes} style={style}>
            {children}
        </span>
    );
};
