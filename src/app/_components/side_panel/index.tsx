"use client";
import Notes from "./notes";
import clsx from "clsx";
import { AssistantButton } from "./assistant_button/assistant_button";

const SidePanel = ({ className }: { className?: string }) => {
    return (
        <div
            className={clsx(
                "flex-col flex-grow bg-transparent space-y-3 h-screen overflow-y-auto pb-40 pt-32",
                className
            )}
        >
            <Notes />
            <AssistantButton />
        </div>
    );
};

export default SidePanel;
