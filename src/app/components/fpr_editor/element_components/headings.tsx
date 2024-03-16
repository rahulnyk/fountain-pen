import { CustomElementProps, editorModes } from "../types";
import React, { useEffect, useState, useContext } from "react";
import {
    heading1Style,
    heading2Style,
    heading3Style,
    titleStyle,
} from "../typography";
import { useSelected, useFocused } from "slate-react";

export const Heading: React.FC<CustomElementProps> = (
    props: CustomElementProps
) => {
    const { attributes, children, element } = props;

    const [headingClassName, setHeadingClassName] = useState<string>("");

    // Show gutter line when active
    const [showGutter, setShowGutter] = useState(false);
    const selected = useSelected();
    const focused = useFocused();

    useEffect(() => {
        setShowGutter(selected && focused);
    }, [selected, focused]);

    //

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
        <div
            className={`flex-grow p-4 ${headingClassName} p-4 rounded hover:border-gray-300 ${
                showGutter
                    ? "border-l-4 border-gray-300 bg-gray-50"
                    : "border-l-4 border-transparent"
            }`}
        >
            {children}
        </div>
    );
};
