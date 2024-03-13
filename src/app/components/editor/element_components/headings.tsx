import { CustomElementProps, editorModes } from "../types";
import React, { useEffect, useState, useContext } from "react";
import {
    heading1Style,
    heading2Style,
    heading3Style,
    titleStyle,
} from "../typography";
import { ModeContext } from "../article_editor";
import { EditorGutter } from "../../editable_gutter";

export const Heading: React.FC<CustomElementProps> = (
    props: CustomElementProps
) => {
    const { attributes, children, element } = props;

    const [headingClassName, setHeadingClassName] = useState<string>("");

    const editorMode = useContext(ModeContext);

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

    const notEditable = (mode: string) => {
        return ["edit", "readonly"].includes(mode);
    };

    return (
        <div
            className={`flex ${notEditable(editorMode) ? "select-none" : ""}`}
            contentEditable={!notEditable(editorMode)}
        >
            <EditorGutter visible={!notEditable(editorMode)} />
            <div className={`flex-grow p-4 ${headingClassName}`}>
                {children}
            </div>
        </div>
    );
};
