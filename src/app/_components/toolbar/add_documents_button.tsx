"use client";

import { useState } from "react";
import { ToolButton } from "./tool_button";
import { embeddDocuments } from "@/app/_actions/embedd_docs";
import { LoadingSpinner } from "../loading_spinner";

export const AddDocumentsButton: React.FC = () => {
    const [isPending, setIsPending] = useState(false);

    const handleOnClick = async () => {
        setIsPending(true);
        await embeddDocuments();
        console.log("document embedding done");
        setIsPending(false);
    };

    return (
        <ToolButton onClick={handleOnClick}>
            {/* <HiOutlineDocumentAdd className="mx-2 size-5" /> */}
            <div className="w-full">
                {isPending ? <LoadingSpinner className="size-4" /> : "Add Docs"}
            </div>
        </ToolButton>
    );
};
