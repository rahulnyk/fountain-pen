"use client";
import { useState } from "react";
import { Button } from "../../button";
import { embeddAllDocuments } from "@/app/_actions/vector_store/embedd_all_documents";
import { LoadingSpinner } from "../../loading_spinner";
import clsx from "clsx";

export const AddDocumentsButton = ({ className }: { className?: string }) => {
    const [isPending, setIsPending] = useState(false);

    const handleOnClick = async () => {
        setIsPending(true);
        try {
            await embeddAllDocuments();
        } catch (e: any) {
            console.log("Embedding failed with error - ", e?.message);
        } finally {
            console.log("document embedding done");
            setIsPending(false);
        }
    };

    return (
        <Button
            onClick={handleOnClick}
            loading={isPending}
            className={clsx("w-40", className)}
        >
            ADD DOCUMENTS
        </Button>
    );
};
