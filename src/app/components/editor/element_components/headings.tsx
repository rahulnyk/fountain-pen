import { CustomElementProps, editorModes } from "../types";
import React, { useEffect, useState, useContext } from "react";
import {
    heading1Style,
    heading2Style,
    heading3Style,
    titleStyle,
} from "../typography";
import { ModeContext } from "../article_editor";
import { PiAnchorThin } from "react-icons/pi";
import { FaAnchorLock } from "react-icons/fa6";

export const Heading: React.FC<CustomElementProps> = (
    props: CustomElementProps
) => {
    const { attributes, children, element } = props;

    const [headingClassName, setHeadingClassName] = useState<string>("");

    const editorMode = useContext(ModeContext);

    useEffect(() => console.log("From Headings", editorMode), [editorMode]);

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

    const showAnchor = (mode: string) => {
        return (['edit', 'readonly'].includes(mode))
    }

    return (
        <div
            className={`flex items-center mb-4 mt-1 ${headingClassName} ${showAnchor(editorMode)? 'select-none' : ''}`}
            contentEditable={!showAnchor(editorMode)}
        >

            <div className={`flex-grow p-0 pr-2 ${showAnchor(editorMode)? 'border-r-2 border-r-slate-300': '' }`}>
                {children}
            </div>
            <div className="p-2 w-8 h-full">
                <FaAnchorLock className={`h-4 w-4 text-slate-300 ${showAnchor(editorMode)? 'visible': 'hidden'}`}  />
            </div>
            
                {/*  
                <div className="flex items-center mb-4 mt-1" contentEditable={false}>
                    <FaAnchorLock className={`h-3 w-3 -ml-3 ${showAnchor(editorMode)? 'text-gray-500' :' text-white'}`} />
                    <hr className={`flex-grow border-t border-dashed mx-2 ${showAnchor(editorMode)? 'border-gray-200' : 'border-white'}`} />
                </div> 
                */}

        </div>
    );
};
