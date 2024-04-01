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
import { useCallback } from "react";

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
    const [render, setRender] = useState<number>(0);
    const [refreshVisible, setRefreshVisible] = useState<boolean>(false);

    const getOutline = useCallback(async () => {
        const outlineRes: outlineResponse[] = await generateOutline({
            title,
            notes: titleNotes,
        });
        return outlineRes;
    }, [title, titleNotes]);

    const refresh = async () => {
        setIsWaiting(true);
        const outlineRes = await getOutline();
        setOutline(outlineRes);
        setRender(render + 1);
        setIsWaiting(false);
        setRefreshVisible(false);
        console.log("\n\nREFRESH", title, titleNotes, render);
    };

    useEffect(() => {
        refresh();
    }, []);

    useEffect(() => {
        setRefreshVisible(true);
    }, [title, titleNotes]);

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
                {refreshVisible && (
                    <IoMdRefreshCircle
                        className="size-6 text-gray-600 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-600"
                        onClick={refresh}
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
                        outline.map((item, index) => (
                            <OutlineCard
                                item={item}
                                key={`${item.level}${index}`}
                            />
                        ))}
                </div>
            )}
        </div>
    );
};
