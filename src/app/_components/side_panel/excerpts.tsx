"use client";
import { semanticSearch } from "@/app/_actions/vector_store";
import clsx from "clsx";
import { ExcerptCard } from "./excerpt_card";
import { Document } from "langchain/document";
import { useState } from "react";
import { HiOutlineDocumentSearch } from "react-icons/hi";
import { useSlate } from "slate-react";
import { CustomBaseElement } from "../main_editor/types";
import { LoadingSpinner } from "../loading_spinner";
import { MdExpandLess } from "react-icons/md";
import { MdExpandMore } from "react-icons/md";

export const Excerpts: React.FC = ({ className }: { className?: string }) => {
    const [documents, setDocuments] = useState<Document[]>([]);
    const editor = useSlate();
    const [cardHeading, setCardHeading] = useState<string>("");
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
    const [isWaiting, setIsWaiting] = useState<boolean>(false);

    const searchDocs = async () => {
        setIsCollapsed(!isCollapsed);
        if (isCollapsed) {
            setCardHeading("");
            setDocuments([]);
        } else {
            setIsWaiting(true);
            const text = await getSectionTextAndNotes();
            const results = await semanticSearch({ text });
            setCardHeading(chop(text));
            setDocuments(results);
            setIsWaiting(false);
        }
    };

    const getSectionTextAndNotes = async () => {
        const sectionText = editor.getCurrentSectionText();
        const sectionNotes = editor.getCurrentSectionNotes();
        return [sectionText, sectionNotes].join("\n");
    };

    const chop = (txt: string | undefined): string => {
        if (!txt) {
            return "";
        }
        const chop_length = 50;
        let dots = txt.length > chop_length ? "..." : "";
        return txt.slice(0, 50) + dots;
    };

    return (
        <div
            className={clsx(
                "flex-col rounded shadow",
                "rounded-l-sm border-l border-blue-500 dark:border-blue-500",
                "bg-gray-50 dark:bg-zinc-600/20",
                className
            )}
            onClick={searchDocs}
        >
            <div
                className={clsx(
                    "flex h-auto w-full text-left text-xs items-center justify-between p-4",
                    "text-zinc-400 dark:text-zinc-500"
                )}
                // onClick={foldNotes}
            >
                <div className="flex items-center">
                    <HiOutlineDocumentSearch className="size-6 pr-2" /> SEARCH
                    DOCS
                    {!isCollapsed ? "" : [" | ", cardHeading].join("")}
                    {isWaiting ? (
                        <LoadingSpinner className="size-4 border-cyan-400 mx-2" />
                    ) : null}
                </div>

                {isCollapsed ? (
                    <MdExpandLess className="size-6" />
                ) : (
                    <MdExpandMore className="size-6" />
                )}
            </div>
            <div className="space-y-2 my-0 mx-0 w-auto">
                {documents.map((doc) => (
                    <ExcerptCard document={doc} />
                ))}
            </div>
        </div>
    );
};
