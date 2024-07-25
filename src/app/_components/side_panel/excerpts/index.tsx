"use client";
import { semanticSearch } from "@/app/_actions/vector_store";
import clsx from "clsx";
import { ExcerptCard } from "./excerpt_card";
import { Document } from "langchain/document";
import { useEffect, useState } from "react";
import { useSectionContext } from "@/app/_store/sectionContextStore";
import { TabPanel } from "../tab_panel";
// import { Toast } from "../../toast";
// import { AddDocumentsButton } from "../references_panel/add_documents_button";

export const Excerpts = ({ className }: { className?: string }) => {
    const [documents, setDocuments] = useState<Document[] | null>(null);
    const [isWaiting, setIsWaiting] = useState<boolean>(false);

    const [active, setActive] = useState<boolean>(false);
    const [tabIndex, setTabIndex] = useState<number>(0);

    const heading = useSectionContext((state) => state.heading);
    const notes = useSectionContext((state) => state.notes);
    const text = useSectionContext((state) => state.text);

    const searchDocs = async () => {
        setIsWaiting(true);
        if (heading || notes || text) {
            const content = [heading, notes, text].join("\n");
            const results = await semanticSearch({
                text: content,
                numResults: 10,
            });
            setDocuments(results);
            results.map((r) => console.log(r.metadata));
        }
        setActive(false);
        setIsWaiting(false);
    };

    const refresh = () => {
        searchDocs();
    };

    useEffect(() => {
        setActive(true);
    }, [heading, notes, text]);

    return (
        <TabPanel
            isWaiting={isWaiting}
            className={className}
            subheadingText="Documents excerpts are searched in your documents using the current section content, heading and notes."
            onClick={refresh}
            buttonActive={active}
            key="tab_panel_excerpts"
            buttonText="SEARCH DOCUMENTS"
        >
            <>
                <div
                    role="tablist"
                    className="tabs tabs-bordered pb-4 tabs-sm w-full overflow-y-auto"
                >
                    {documents &&
                        documents.map((_, index) => (
                            <a
                                role="tab"
                                className={clsx(
                                    "tab",
                                    tabIndex == index && "tab-active"
                                )}
                                onClick={() => setTabIndex(index)}
                                key={`exerpts-tab-${index}`}
                            >
                                {index + 1}
                            </a>
                        ))}
                </div>
                <div className="space-y-2 my-0 mx-0 w-full">
                    {documents && documents[tabIndex] && (
                        <ExcerptCard
                            document={documents[tabIndex]}
                            key={`excerpt-${tabIndex}`}
                        />
                    )}
                </div>
                {/* <div className="flex w-full justify-end">
                    <AddDocumentsButton />
                </div> */}
                {/* <Toast><p>This is a toast</p></Toast> */}
            </>
        </TabPanel>
    );
};
