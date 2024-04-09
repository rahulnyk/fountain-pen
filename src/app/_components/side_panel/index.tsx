"use client";
import Notes from "./notes";
import clsx from "clsx";
import { createContext, useState } from "react";
import { Path } from "slate";
// import { BsArrowsExpandVertical } from "react-icons/bs";
import { RiExpandLeftRightLine } from "react-icons/ri";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import { AssistantPanel } from "./assistant_panel";

export type notesContextType = {
    notes: string[];
    at?: Path;
};

export const NotesContext = createContext<notesContextType | undefined>(
    undefined
);

const SidePanel = ({ className }: { className?: string }) => {
    const [notesUpdates, setNotesUpdates] = useState<any>({});
    const pannelWidthOptions = ["w-1/3", "w-2/3"];
    const [panelWidthOption, setPanelWidthOption] = useState<number>(0);
    const [panelWidth, setPanelWidth] = useState<string>(pannelWidthOptions[0]);

    const setContext = (value: notesContextType | undefined) => {
        setNotesUpdates(value);
    };

    const toggleWidth = () => {
        const option = (panelWidthOption + 1) % pannelWidthOptions.length;
        setPanelWidthOption(option);
        setPanelWidth(pannelWidthOptions[option]);
    };

    const maxWidth = () => {
        return panelWidth === pannelWidthOptions[pannelWidthOptions.length - 1];
    };

    return (
        <div
            className={clsx(
                "fixed z-50 pt-0 pl-3 pr-3 right-0 top-0",
                "bg-opacity-80 mx-0 py-1 px-2 backdrop-filter backdrop-blur-lg",
                "bg-zinc-300/30 dark:bg-zinc-900/80",
                // "border-[1px] border-zinc-100 dark:border-zinc-900",
                panelWidth,
                "transition-[width] duration-300"
            )}
        >
            <div
                className={clsx(
                    "flex items-center justify-around rounded-full size-8",
                    "bg-opacity-80 mx-0 py-1 px-2 backdrop-filter backdrop-blur-xl",
                    "bg-zinc-300/30 dark:bg-zinc-900/80",
                    // "bg-blue-500 dark:bg-blue-600 ",
                    "absolute -left-10 top-16"
                    // "border-[1px] dark:border-zinc-700 border-white"
                )}
                onClick={toggleWidth}
            >
                {maxWidth() ? (
                    <FaAngleRight className="size-4" />
                ) : (
                    <FaAngleLeft className="size-4" />
                )}
            </div>
            <NotesContext.Provider value={notesUpdates}>
                <div
                    className={clsx(
                        "flex-col flex-grow bg-transparent space-y-3 h-screen overflow-y-auto pb-20 pt-5",
                        className
                    )}
                >
                    {/* Notes */}
                    <Notes setContext={setContext} />

                    {/* <AssistantButton /> */}
                    <div className="divider px-0 py-4 text-zinc-500 dark:text-zinc-600 text-xs font-bold">
                        AI ASSISTANT
                    </div>
                    <AssistantPanel />
                </div>
            </NotesContext.Provider>
        </div>
    );
};

export default SidePanel;
