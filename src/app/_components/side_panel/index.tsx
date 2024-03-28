"use client";
import Notes from "./notes";
import clsx from "clsx";
import { Excerpts } from "./excerpts";
import { Assistant } from "./assistant";

const SidePanel = ({ className }: { className?: string }) => {
    return (
        <div
            className={clsx(
                "flex-col flex-grow bg-transparent space-y-3 h-screen overflow-y-auto pb-40 pt-32",
                className
            )}
        >
            <Notes />
            <Excerpts />
            <Assistant />
        </div>
    );
};

export default SidePanel;
