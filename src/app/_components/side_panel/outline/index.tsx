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
import { useSectionContext } from "@/app/_store/sectionContextStore";

export const Outline = ({ className }: { className?: string }) => {
    const [isWaiting, setIsWaiting] = useState<boolean>(false);
    const [outline, setOutline] = useState<outlineResponse[] | null>(null);
    const [refreshVisible, setRefreshVisible] = useState<boolean>(false);

    const title = useSectionContext((state) => state.title);
    const titleNotes = useSectionContext((state) => state.titleNotes);

    const getOutline = useCallback(async () => {
        const outlineRes = await generateOutline({
            title,
            titleNotes,
        });
        return outlineRes;
    }, [title, titleNotes]);

    const refresh = async () => {
        setIsWaiting(true);
        const outlineRes = await getOutline();
        setOutline(outlineRes);
        setIsWaiting(false);
        setRefreshVisible(false);
    };

    useEffect(() => {
        refresh();
    }, []);

    useEffect(() => {
        setRefreshVisible(true);
        console.log("editor changed");
    }, [title, titleNotes]);

    const removeItem = (index: number) => {
        const newOutline = outline;
        newOutline?.splice(index, 1);
        setOutline(newOutline);
    };

    return (
        <div
            className={clsx(
                "flex-col rounded shadow pb-10",
                "rounded-l-sm border-l border-blue-500 dark:border-blue-500",
                "bg-gray-50 dark:bg-zinc-600/20",
                className,
                generalTextStyle
            )}
        >
            <div className="flex justify-between space-x-5 p-4">
                <div className={clsx("w-5/6")}>OUTLINE</div>
                {!isWaiting && refreshVisible && (
                    <IoMdRefreshCircle
                        className="size-6 text-gray-600 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-600"
                        onClick={refresh}
                    />
                )}
            </div>
            <div className="px-4 text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-5 pb-5">
                Results are based only on the title, and the title notes. <br />
                For better results, write more about the article in the title
                notes.
            </div>
            {isWaiting ? (
                <LoadingSpinner className="size-10 align-middle justify-center p-4 m-10" />
            ) : (
                <div className="space-y-2 my-0 mx-0 w-auto">
                    {outline &&
                        outline.map((item, index) => (
                            <OutlineCard
                                item={item}
                                index={index}
                                removeItem={removeItem}
                                key={`${item.level}${index}`}
                            />
                        ))}
                </div>
            )}
        </div>
    );
};
