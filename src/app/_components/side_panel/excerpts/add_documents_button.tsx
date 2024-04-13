"use client";
import { useState } from "react";
import { embeddDocuments } from "@/app/_actions/vector_store";
import { Button } from "../../button";
import { LoadingSpinner } from "../../loading_spinner";

export const AddDocumentsButton = ({ className }: { className?: string }) => {
    const [isPending, setIsPending] = useState(false);

    const handleOnClick = async () => {
        setIsPending(true);
        await embeddDocuments();
        console.log("document embedding done");
        setIsPending(false);
    };

    return (
        <Button onClick={handleOnClick} loading={isPending} className="w-40">
            ADD DOCUMENTS
        </Button>
    );
};
