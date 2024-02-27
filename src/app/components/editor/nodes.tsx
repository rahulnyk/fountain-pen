import { Title, NormalText, Heading1, Heading2, Heading3 } from "./typography";
import { ElementProps, LeafProps, BasicWrapperProps } from "./types";



export const ElementNode = ({ attributes, children, element }: ElementProps) => {
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
        case "section":
            return <Section> {children} </Section>;
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

export const Section: React.FC<BasicWrapperProps> = ({
    children,
    className,
}) => {
    return (
        <div>
            <hr
                className={`my-12 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-900 to-transparent opacity-25 dark:opacity-100 ${className}`}
            />
            {children}
        </div>
    );
};