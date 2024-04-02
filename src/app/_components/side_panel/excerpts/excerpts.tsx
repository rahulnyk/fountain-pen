"use client";
import { semanticSearch } from "@/app/_actions/vector_store";
import clsx from "clsx";
import { ExcerptCard } from "./excerpt_card";
import { Document } from "langchain/document";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "../../loading_spinner";
import { IoMdRefreshCircle } from "react-icons/io";

export const Excerpts = ({
    className,
    title,
    heading,
    notes,
    titleNotes,
    text,
}: {
    className?: string;
    title: string;
    heading: string;
    notes: string;
    titleNotes: string;
    text: string;
}) => {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [isWaiting, setIsWaiting] = useState<boolean>(false);
    const [searchReferenceHeading, setSearchReferenceHeading] = useState<
        string | undefined
    >();
    const [refreshVisible, setRefreshVisible] = useState<boolean>(false);

    const searchDocs = async () => {
        setIsWaiting(true);
        const content = [title, titleNotes, heading, text, notes].join("\n");
        const results = await semanticSearch({ text: content, numResults: 10 });
        setDocuments(results);
        setSearchReferenceHeading(heading);
        setRefreshVisible(false);
        setIsWaiting(false);
    };

    useEffect(() => {
        searchDocs();
    }, []);

    const refresh = () => {
        searchDocs();
    };

    useEffect(() => {
        setRefreshVisible(true);
    }, [heading, notes, text]);

    return (
        <div
            className={clsx(
                "flex-col rounded shadow",
                "rounded-l-sm border-l border-blue-500 dark:border-blue-500",
                "bg-gray-50 dark:bg-zinc-600/20",
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
            <div className="px-4 text-xs font-bold text-blue-500 dark:text-blue-400 mb-4">
                Results are based on Title, Current Section, and respective
                Notes
            </div>
            {isWaiting ? (
                <LoadingSpinner className="size-10 align-middle justify-center p-4 m-10" />
            ) : (
                <div className="space-y-2 my-0 mx-0 w-auto">
                    {documents.map((doc) => (
                        <ExcerptCard document={doc} />
                    ))}
                </div>
            )}
        </div>
    );
};
