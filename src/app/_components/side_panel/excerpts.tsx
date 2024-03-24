"use client";
import { semanticSearch } from "@/app/_actions/vector_store";
import clsx from "clsx";
import { ExcerptCard } from "./excerpt_card";
import { Document } from "langchain/document";
import { useState } from "react";

export const Excerpts: React.FC = ({ className }: { className?: string }) => {
    const [documents, setDocuments] = useState<Document[]>([]);

    const searchDocs = async () => {
        console.log("docs");
        let search_text = "why do we need a conscent manager";
        const results = await semanticSearch({ text: search_text });
        console.log(results);
        setDocuments(results);
    };

    return (
        <div
            className={clsx(
                "flex-col w-full rounded shadow-sm bg-slate-50 p-1 px-0 border-l-teal-500",
                "border-l-4 border-indigo-500",
                className
            )}
            onClick={searchDocs}
        >
            <div className="space-y-5 my-5 mx-0 w-auto">
                {documents.map((doc) => (
                    <ExcerptCard document={doc} />
                ))}
            </div>
        </div>
    );
};
