import { CustomElementProps } from "./types";
import { useEffect, useState } from "react";
import { CiStickyNote } from "react-icons/ci";
import { NotesElement } from "./types";
import { ReactEditor, Slate, useSlate } from "slate-react";
import { Transforms } from "slate";
import { notes } from "./typography";

const Notes: React.FC<CustomElementProps> = (props: CustomElementProps) => {
    const { attributes, children, element } = props;
    const editor = useSlate();

    const [isFloatingDivVisible, setFloatingDivVisible] = useState(false);

    const toggleFloatingDiv = () => {
        setFloatingDivVisible(!isFloatingDivVisible);
    };

    const [text, setText] = useState<string>((element as NotesElement).notes);
    const [lines, setLines] = useState<number>(2);

    const handleInputChange = (event: any) => {
        setText(event.target.value);
        const path = ReactEditor.findPath(editor, element);
        Transforms.setNodes(editor, { notes: text }, { at: path });
        // console.log(element);
    };

    useEffect(() => {
        setLines((text.match(/\n/g) || "").length + 1);
    }, [text]);

    return (
        <div
            {...attributes}
            contentEditable={false}
            className={`absolute -ml-10 -mt-3 -mb-3
            ${isFloatingDivVisible ? "h-auto w-2/3" : "h-1 w-1"}
             bg-green-100 p-2 rounded shadow-md shadow-transparent transition-all delay-0 duration-100 overflow-hidden`}
        >
            <button
                // className="bg-transparent rounded-full p-2 focus:outline-none hover:bg-gray-200 transition"
                className="absolute top-0 left-0 text-black p-2 w-full bg-green-200"
                onClick={toggleFloatingDiv}
            >
                {/* <CiStickyNote /> */}
            </button>

            {isFloatingDivVisible && (
                <div className="mt-2">
                    <textarea
                        value={text}
                        onChange={handleInputChange}
                        className={`w-full p-2 bg-green-100 focus:outline-none ${notes.className} resize-none`}
                        rows={lines}
                    />
                </div>
            )}
            {children}
        </div>
    );
};

export default Notes;
