"use client";
import Notes from "./notes";
import clsx from "clsx";
import { AssistantButton } from "./assistant_button/assistant_button";
import { createContext, useState } from "react";
import { Path } from "slate";

export type notesContextType = {
    notes: string[];
    at?: Path;
};

export const NotesContext = createContext<notesContextType | undefined>(
    undefined
);

const SidePanel = ({ className }: { className?: string }) => {
    const [notesUpdates, setNotesUpdates] = useState<any>({});

    const setContext = (value: notesContextType | undefined) => {
        setNotesUpdates(value);
    };

    return (
        <NotesContext.Provider value={notesUpdates}>
            <div
                className={clsx(
                    "flex-col flex-grow bg-transparent space-y-3 h-screen overflow-y-auto pb-40 pt-32",
                    className
                )}
            >
                <Notes setContext={setContext} />
                <AssistantButton />
            </div>
        </NotesContext.Provider>
    );
};

export default SidePanel;
