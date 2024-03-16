import { EventHandler, useEffect } from "react";
import { useState } from "react";

const Notes = ({
    text,
    onChange,
    textStyle,
}: {
    text: string;
    onChange: EventHandler<any>;
    textStyle: string;
}) => {
    const [lines, setLines] = useState<number>(2);

    useEffect(() => {
        setLines(text ? (text.match(/\n/g) || "").length + 1 : 2);
    }, [text]);

    return (
        <>
            <div
                className={
                    "flex-col h-auto w-full bg-green-50 rounded shadow-md p-0"
                }
            >
                <button className="h-4 rounded-t overflow-hidden mt-t mx-0 text-black w-full bg-green-100">
                    {/* <CiStickyNote /> */}
                </button>

                <div className="mt-0 p-2 text-purple-950">
                    <textarea
                        value={text}
                        onChange={onChange}
                        className={`w-full p-2 bg-green-50 focus:outline-none ${textStyle} `}
                        rows={lines}
                    />
                </div>
            </div>
        </>
    );
};

export default Notes;
