"use client";
import { FprAssistant } from "../assistant";
import Notes from "./notes";
import { TestServer } from "@/app/_actions/test_server";
import clsx from "clsx";

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
            {/* <FprAssistant action={TestServer} /> */}
        </div>
    );
};

export default SidePanel;
