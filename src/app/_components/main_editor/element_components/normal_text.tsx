import { useSlate, ReactEditor, useSelected, useFocused } from "slate-react";
import { BasicWrapperProps } from "../types";
import { paragraphStyle } from "../typography";
import { CustomElementProps, editorModes } from "../types";
import { useState, useEffect } from "react";
import clsx from "clsx";

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
            className={`p-4 pr-10 rounded border-l-4 ${paragraphStyle} ${
                showGutter
                    ? "border-blue-500 dark:border-blue-600 bg-gray-50 dark:bg-zinc-800/25"
                    : "border-transparent  hover:border-zinc-400/25"
            }`}
        >
            <div className="z-20">{children}</div>
        </div>
    );
};
