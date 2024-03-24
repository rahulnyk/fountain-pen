"use client";
import Notes from "./notes";
import clsx from "clsx";
import { Excerpts } from "./excerpts";

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
        </div>
    );
};

export default SidePanel;
