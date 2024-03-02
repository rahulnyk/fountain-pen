import { Title, NormalText, Heading1, Heading2, Heading3 } from "./typography";
import { CustomElementProps, LeafProps, BasicWrapperProps } from "./types";

import Notes from "./notes";


export const ElementNode = (props: CustomElementProps) => {
    const { attributes, children, element } = props
    switch (element.type) {
        case "title":
            return <Title>{children}</Title>;
        case "paragraph":
            return <NormalText {...attributes}>{children}</NormalText>;
        case "heading1":
            return <Heading1 {...attributes}>{children}</Heading1>;
        case "heading2":
            return <Heading2 {...attributes}>{children}</Heading2>;
        case "heading3":
            return <Heading3 {...attributes}>{children}</Heading3>;
        case "notes":
            return <Notes {...props}/>;
        default:
            return <NormalText {...attributes}>{children}</NormalText>;
    }
};

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

