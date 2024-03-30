"use client";
import { semanticSearch } from "@/app/_actions/vector_store";
import clsx from "clsx";
import { ExcerptCard } from "./excerpt_card";
import { Document } from "langchain/document";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "../loading_spinner";

export const Excerpts = ({
    className,
    title,
    heading,
    notes,
    text,
}: {
    className?: string;
    title: string;
    heading: string;
    notes: string;
    text: string;
}) => {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [isWaiting, setIsWaiting] = useState<boolean>(false);

    const searchDocs = async () => {
        setIsWaiting(true);
        const content = [title, heading, text, notes].join("\n");
        const results = await semanticSearch({ text });
        setDocuments(results);
        setIsWaiting(false);
    };

    useEffect(() => {
        searchDocs();
    }, [title, heading, notes, text]);

    // const chop = (txt: string | undefined): string => {
    //     if (!txt) {
    //         return "";
    //     }
    //     const chop_length = 50;
    //     let dots = txt.length > chop_length ? "..." : "";
    //     return txt.slice(0, 50) + dots;
    // };

    return (
        <div
            className={clsx(
                "flex-col rounded shadow",
                "rounded-l-sm border-l border-blue-500 dark:border-blue-500",
                "bg-gray-50 dark:bg-zinc-600/20",
                className
            )}
        >
            <div className="p-4 text-gray-800 dark:text-gray-100">
                Excerpts From My Documents
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
