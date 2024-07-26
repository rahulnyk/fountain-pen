"use client";
import { useState } from "react";
import { Button } from "../../button";
import { embeddAllDocuments } from "@/app/_actions/vector_store/embedd_all_documents";
import { LoadingSpinner } from "../../loading_spinner";
import { FpToaster } from "../../fp_toast";
import clsx from "clsx";
import toast from "react-hot-toast";

export const AddDocumentsButton = ({ className }: { className?: string }) => {
    const [isPending, setIsPending] = useState(false);

    const handleOnClick = async () => {
        setIsPending(true);
        try {
            const result = await embeddAllDocuments();
            if (result.error){
                toast.error(result.error)
            }
            toast.success(result.message ? result.message : "Embedded all Research Documents")
        } catch (e: any) {
            toast.error(e.message);
        } finally {
            console.log("document embedding done");
            setIsPending(false);
        }
    };

    return (
        <>
            <Button
                onClick={handleOnClick}
                loading={isPending}
                className={clsx("w-40", className)}
            >
                ADD DOCUMENTS
            </Button>
            <FpToaster />
        </>
    );
};
