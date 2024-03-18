"use client";
import { FprAssistant } from "../assistant";
import Notes from "./notes";

const SidePanel = () => {
    return (
        <div className={`flex-col h-full bg-transparent p-10 w-full`}>
            <Notes className="mb-2" />
            <FprAssistant className="my-10" />
        </div>
    );
};

export default SidePanel;
