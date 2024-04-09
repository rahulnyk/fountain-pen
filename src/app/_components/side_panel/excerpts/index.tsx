"use client";
import { semanticSearch } from "@/app/_actions/vector_store";
import clsx from "clsx";
import { ExcerptCard } from "./excerpt_card";
import { Document } from "langchain/document";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "../../loading_spinner";
import { IoMdRefreshCircle } from "react-icons/io";
import { useSectionContext } from "@/app/_store/sectionContextStore";

export const Excerpts = ({ className }: { className?: string }) => {
    const [documents, setDocuments] = useState<Document[] | null>(null);
    const [isWaiting, setIsWaiting] = useState<boolean>(false);
    const [searchReferenceHeading, setSearchReferenceHeading] = useState<
        string | null
    >();
    const [refreshVisible, setRefreshVisible] = useState<boolean>(false);
    const [tabIndex, setTabIndex] = useState<number>(0);

    const heading = useSectionContext((state) => state.heading);
    const notes = useSectionContext((state) => state.notes);
    const text = useSectionContext((state) => state.text);

    const searchDocs = async () => {
        setIsWaiting(true);
        if (heading || notes || text) {
            const content = [heading, notes, text].join("\n");
            const results = await semanticSearch({
                text: content,
                numResults: 10,
            });
            setDocuments(results);
            setSearchReferenceHeading(heading);
        }
        setRefreshVisible(false);
        setIsWaiting(false);
    };

    // useEffect(() => {
    //     searchDocs();
    // }, []);

    const refresh = () => {
        searchDocs();
    };

    useEffect(() => {
        setRefreshVisible(true);
    }, [heading, notes, text]);

    return (
        <div
            className={clsx(
                "flex-col rounded-lg w-full",
                // "bg-white dark:bg-zinc-900/90 pb-3 pt-5 px-2",
                className
            )}
        >
            <div className="flex justify-between space-x-5 p-4 text-gray-800 dark:text-gray-100 ">
                <div className="w-5/6">
                    Excerpts From Documents{" "}
                    {searchReferenceHeading
                        ? " | ".concat(searchReferenceHeading)
                        : ""}
                </div>
                {refreshVisible && !isWaiting && (
                    <IoMdRefreshCircle
                        className="size-6 text-gray-600 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-600"
                        onClick={refresh}
                    />
                )}
            </div>
            <div className="px-4 text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-5 pb-5">
                Results are based current section heading and notes
            </div>

            {isWaiting ? (
                <LoadingSpinner className="size-10 align-middle justify-center p-4 m-10" />
            ) : (
                <>
                    <div
                        role="tablist"
                        className="tabs tabs-bordered pb-4 px-4 tabs-sm w-full overflow-y-auto"
                    >
                        {documents &&
                            documents.map((_, index) => (
                                <a
                                    role="tab"
                                    className={clsx(
                                        "tab",
                                        tabIndex == index && "tab-active"
                                    )}
                                    onClick={() => setTabIndex(index)}
                                    key={`exerpts-tab-${index}`}
                                >
                                    {index + 1}
                                </a>
                            ))}
                    </div>
                    <div className="space-y-2 my-0 mx-0 w-full">
                        {documents && documents[tabIndex] && (
                            <ExcerptCard
                                document={documents[tabIndex]}
                                key={`excerpt-${tabIndex}`}
                            />
                        )}
                    </div>
                </>
            )}
        </div>
    );
};
