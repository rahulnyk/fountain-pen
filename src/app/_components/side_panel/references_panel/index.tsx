"use client";
import clsx from "clsx";
import { useEffect } from "react";
import { ReferencesCard } from "./references_card";
import { TabPanel } from "../tab_panel";
import { useReferencesStore } from "@/app/_store/referencesStore";
import { AddReferenceForm } from "./add_refrences_form";
import { getReferences } from "@/app/_actions/ldb";
import { AddDocumentsButton } from "./add_documents_button";

export const ReferencesPanel = ({ className }: { className?: string }) => {
    const references = useReferencesStore((state) => state.references);
    const setReferences = useReferencesStore((state) => state.setReferences);

    useEffect(() => {
        const loadReferences = async () => {
            const references = await getReferences();
            if (references) {
                setReferences(references);
            }
        };
        loadReferences();
    }, []);

    return (
        <>
            <TabPanel key="references-panel" buttonVisible={false}>
                {references.map((reference) => (
                    <ReferencesCard item={reference} key={reference.name} />
                ))}
                <AddReferenceForm />
                {/* <div className="flex w-full justify-start"> */}
                <div className="divider px-0 py-4 text-zinc-500 dark:text-zinc-600 text-xs font-bold">
                    OR
                </div>
                <AddDocumentsButton className="mx-4 justify-center content-center bg-gradient-to-r from-indigo-700 to-blue-700" />
                {/* </div> */}
            </TabPanel>
        </>
    );
};
