import { Lato } from "next/font/google";
import clsx from "clsx";
import { useEffect } from "react";

export const textStyle = Lato({
    subsets: ["latin"],
    weight: "300",
});

export type wpSuggestion = {
    key: string;
    point: string;
};

export const WritingPointsSuggestionsCard = ({
    item,
}: {
    item: wpSuggestion;
}) => {
    return (
        <div
            className={clsx(
                "flex-col flex-grow rounded py-2 mx-0 text-pretty ",
                "text-zinc-500 dark:text-zinc-400"
            )}
        >
            <div
                className={clsx(
                    "flex items-start space-x-4",
                    "whitespace-pre-wrap break-normal font-normal text-sm",
                    textStyle
                )}
            >
                <div className="text-lg rounded-full">{item.key}</div>
                <div>{item.point}</div>
            </div>
        </div>
    );
};
