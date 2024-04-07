"use client";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "../../loading_spinner";
import { IoMdRefreshCircle } from "react-icons/io";
import { generalTextStyle } from "../../main_editor/typography";
import { useCallback } from "react";
import { WritingPointsSuggestionsCard } from "./writing_points_suggestions_card";
import { generateWritingPoints } from "@/app/_actions/rag/generate_writing_points";
import { wpSuggestion } from "./writing_points_suggestions_card";
import { useSectionContext } from "@/app/_store/sectionContextStore";

export const WritingPointsSuggestions = ({
    className,
}: {
    className?: string;
}) => {
    const heading = useSectionContext((state) => state.heading);
    const notes = useSectionContext((state) => state.notes);
    const text = useSectionContext((state) => state.text);

    const [isWaiting, setIsWaiting] = useState<boolean>(false);
    const [writingPoints, setWritingPoints] = useState<wpSuggestion[] | null>(
        null
    );
    const [refreshVisible, setRefreshVisible] = useState<boolean>(false);
    const [referenceHeading, setReferenceHeading] = useState<string | null>();

    const getWritingPointsSuggestions = useCallback(async () => {
        const writingPointsSuggestions = await generateWritingPoints({
            heading,
            notes,
            text,
        });
        return writingPointsSuggestions;
    }, [heading, notes, text]);

    const refresh = async () => {
        setIsWaiting(true);
        setReferenceHeading(heading);
        if (heading && text && notes) {
            const writingPointsSuggestions =
                await getWritingPointsSuggestions();
            setWritingPoints(writingPointsSuggestions);
            console.log(
                "From Writing Points Suggestion Component",
                writingPointsSuggestions
            );
        }
        setIsWaiting(false);
        setRefreshVisible(false);
    };

    useEffect(() => {
        refresh();
    }, []);

    useEffect(() => {
        setRefreshVisible(true);
        // console.log("editor changed");
    }, [heading, notes, text]);

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
                <div className={clsx("w-5/6")}>
                    WRITING POINTS
                    {referenceHeading ? " | ".concat(referenceHeading) : ""}
                </div>
                {!isWaiting && refreshVisible && (
                    <IoMdRefreshCircle
                        className="size-6 text-gray-600 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-600"
                        onClick={refresh}
                    />
                )}
            </div>
            <div className="px-4 text-xs font-bold text-blue-500 dark:text-blue-400 mb-4">
                Writing points suggested based the current section notes and
                document search. <br /> For better results, add more info to the
                current section notes.
            </div>
            {isWaiting ? (
                <LoadingSpinner className="size-10 align-middle justify-center p-4 m-10" />
            ) : (
                <div className="space-y-2 my-0 mx-0 w-auto">
                    {writingPoints &&
                        writingPoints.map((item) => (
                            <WritingPointsSuggestionsCard
                                item={item}
                                key={`wp-suggestions-${item.key}`}
                            />
                        ))}
                </div>
            )}
        </div>
    );
};
