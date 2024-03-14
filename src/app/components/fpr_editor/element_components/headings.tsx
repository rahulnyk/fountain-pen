import { CustomElementProps, editorModes } from "../types";
import React, { useEffect, useState, useContext } from "react";
import {
    heading1Style,
    heading2Style,
    heading3Style,
    titleStyle,
} from "../typography";

export const Heading: React.FC<CustomElementProps> = (
    props: CustomElementProps
) => {
    const { attributes, children, element } = props;

    const [headingClassName, setHeadingClassName] = useState<string>("");

    // useEffect(() => console.log("From Headings", editorMode), [editorMode]);

    useEffect(() => {
        let className = "";
        switch (element.type) {
            case "heading1":
                className = heading1Style;
                break;
            case "heading2":
                className = heading2Style;
                break;
            case "heading3":
                className = heading3Style;
                break;
            case "title":
                className = titleStyle;
                break;
            default:
                className = "";
        }
        setHeadingClassName(className);
    }, [element]);

    return (
        <div className={`flex-grow p-4 ${headingClassName}`}>{children}</div>
    );
};
