"use client";
import clsx from "clsx";
import { useEffect } from "react";
import { ReferencesCard } from "./references_card";
import { TabPanel } from "../tab_panel";
import { useReferencesStore } from "@/app/_store/referencesStore";
import { AddReferenceForm } from "./add_refrences_form";
import { getReferences } from "@/app/_actions/ldb";

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
            </TabPanel>
        </>
    );
};
