"use client";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "../../loading_spinner";
import { IoMdRefreshCircle } from "react-icons/io";
import {
    generateOutline,
    outlineResponse,
} from "@/app/_actions/rag/generate_outline";
import { OutlineCard } from "./outline_card";
import { generalTextStyle } from "../../main_editor/typography";

export const Outline = ({
    className,
    title,
    titleNotes,
}: {
    className?: string;
    title: string;
    heading: string;
    notes: string;
    titleNotes: string;
    text: string;
}) => {
    const [isWaiting, setIsWaiting] = useState<boolean>(false);
    const [outline, setOutline] = useState<outlineResponse[] | undefined>(
        undefined
    );

    const getOutline = async () => {
        setIsWaiting(true);
        const outline: outlineResponse[] = await generateOutline({
            title,
            notes: titleNotes,
        });
        setOutline(outline);
        setIsWaiting(false);
        console.log(outline);
    };

    useEffect(() => {
        getOutline();
    }, []);

    return (
        <div
            className={clsx(
                "flex-col rounded shadow",
                "rounded-l-sm border-l border-blue-500 dark:border-blue-500",
                "bg-gray-50 dark:bg-zinc-600/20",
                className,
                generalTextStyle
            )}
        >
            <div className="flex justify-between space-x-5 p-4">
                <div>OUTLINE</div>
                {!isWaiting && (
                    <IoMdRefreshCircle
                        className="size-6 text-gray-600 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-600"
                        onClick={getOutline}
                    />
                )}
            </div>
            <div className="px-4 text-xs font-bold text-blue-500 dark:text-blue-400 mb-4">
                Results are based only on the Title, and the Title Notes. <br />
                For better results, write more about the article in the Title
                Notes.
            </div>
            {isWaiting ? (
                <LoadingSpinner className="size-10 align-middle justify-center p-4 m-10" />
            ) : (
                <div className="space-y-2 my-0 mx-0 w-auto">
                    {outline &&
                        outline.map((item) => <OutlineCard item={item} />)}
                </div>
            )}
        </div>
    );
};
