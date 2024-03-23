"use client";
import Notes from "./notes";
import clsx from "clsx";
import { FprAssistant } from "../assistant";

const SidePanel = ({ className }: { className?: string }) => {
    return (
        <div
            className={clsx(
                "flex-col bg-transparent w-auto space-y-5",
                className
            )}
        >
            <div>
                <Notes />
            </div>
            <FprAssistant />
        </div>
    );
};

export default SidePanel;
