import { Document } from "langchain/document";
import { Open_Sans } from "next/font/google";
import { Lato } from "next/font/google";
import clsx from "clsx";
import { outlineResponse } from "@/app/_actions/rag/generate_outline";
import { generalTextStyle } from "../main_editor/typography";

export const OutlineCard = ({ item }: { item: outlineResponse }) => {
    return (
        <div
            className={clsx(
                "flex-col flex-grow rounded px-2 py-2 mx-0 text-pretty ",
                "text-zinc-700 dark:text-zinc-200",
                item.level === "subheading" && "ml-8"
            )}
        >
            <p
                className={clsx(
                    generalTextStyle,
                    "font-light text-wrap",
                    "bg-blue-50 dark:bg-blue-900/30 text-md w-auto p-2 rounded"
                )}
            >
                {item.text}
            </p>
            {/* <p className={clsx(textStyle)}></p> */}
            <p className={clsx("font-thin", "text-sm my-0 p-2")}>
                {item.description}
            </p>
        </div>
    );
};
