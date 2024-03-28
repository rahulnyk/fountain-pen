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
import { LuDog } from "react-icons/lu";

export const Assistant: React.FC = ({ className }: { className?: string }) => {
    const [documents, setDocuments] = useState<Document[]>([]);
    const editor = useSlate();
    const [cardHeading, setCardHeading] = useState<string>("");
    const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
    const [isWaiting, setIsWaiting] = useState<boolean>(false);

    const searchDocs = async () => {};

    const getSectionTextAndNotes = async () => {};

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
                "flex-col w-full rounded shadow-sm bg-gray-50 p-1 px-0 border-l-pink-500",
                "border-l-4 border-indigo-500",
                className
            )}
            onClick={searchDocs}
        >
            <div
                className="flex h-auto w-full text-left text-xs items-center justify-between px-4 py-2 text-pink-400"
                // onClick={foldNotes}
            >
                <div className="flex items-center">
                    <LuDog className="size-6 pr-2" /> ASSISTANT
                    {!isCollapsed ? "" : [" | ", cardHeading].join("")}
                    {isWaiting ? (
                        <LoadingSpinner className="size-4 border-pink-400 mx-2" />
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
