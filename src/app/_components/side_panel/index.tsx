"use client";
import { FprAssistant } from "../assistant";
import Notes from "./notes";
import { TestServer } from "@/app/_actions/test_server";

const SidePanel = () => {
    return (
        <div className={`flex-col h-full bg-transparent w-full space-y-5`}>
            <div className="h-50% p-5 m-1">
                <Notes />
            </div>
            {/* <FprAssistant action={TestServer} /> */}
        </div>
    );
};

export default SidePanel;
