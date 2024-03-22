import { useSlate, ReactEditor, useSelected, useFocused } from "slate-react";
import { BasicWrapperProps } from "../types";
import { paragraphStyle } from "../typography";
import { CustomElementProps, editorModes } from "../types";
import { useState, useEffect } from "react";

export const NormalText: React.FC<CustomElementProps> = ({
    children,
    element,
}) => {
    const [showGutter, setShowGutter] = useState(false);
    const selected = useSelected();
    const focused = useFocused();

    useEffect(() => {
        setShowGutter(selected);
    }, [selected, focused]);
    // const showGutter = selected && useFocused;

    return (
        <div
            // className={`p-4 ${paragraphStyle} rounded border-transparent hover:border-gray-400  focus:border-black transition border-l-4`}
            className={`p-4 pr-10 rounded ${paragraphStyle} ${
                showGutter
                    ? "border-l-4 border-gray-400 bg-gray-50"
                    : "border-l-4 border-transparent  hover:border-gray-200"
            }`}
        >
            <p>{showGutter}</p>
            {children}
        </div>
    );
};
