import { Lato } from "next/font/google";
import clsx from "clsx";
import { ChatCompletion } from "openai/resources/index.mjs";
import { useEffect } from "react";

export const textStyle = Lato({
    subsets: ["latin"],
    weight: "300",
});

export const ContentCard = ({ content }: { content: string }) => {
    return (
        <div
            className={clsx(
                "flex-col flex-grow rounded py-4 mx-0 text-pretty ",
                "text-zinc-500 dark:text-zinc-400"
            )}
        >
            <div
                className={clsx(
                    "whitespace-pre-wrap break-normal font-light text-sm",
                    textStyle
                )}
            >
                {content}
            </div>
            <hr className="dark:border-zinc-700 my-4" />
        </div>
    );
};
