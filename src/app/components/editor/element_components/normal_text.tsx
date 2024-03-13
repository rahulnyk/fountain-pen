import { useContext } from "react";
import { BasicWrapperProps } from "../types";
import { paragraphStyle } from "../typography";
import { ModeContext } from "../article_editor";
import { EditorGutter } from "../../editable_gutter";

export const NormalText: React.FC<BasicWrapperProps> = ({ children }) => {
    const editorMode = useContext(ModeContext);

    const notEditable = (mode: string) => {
        return ["outline", "readonly"].includes(mode);
    };

    return (
        <div
            className={`flex justify-between justify-items-start ${
                notEditable(editorMode) ? "select-none" : ""
            }`}
            contentEditable={!notEditable(editorMode)}
        >
            <EditorGutter visible={!notEditable(editorMode)} />

            <div className={`flex-grow p-4 ${paragraphStyle} }`}>
                {children}
            </div>
        </div>
    );
};
