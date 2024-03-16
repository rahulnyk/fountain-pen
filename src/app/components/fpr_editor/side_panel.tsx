"use client";
import Notes from "./notes";

const SidePanel = () => {
    return (
        <div className={`flex-col h-full bg-slate-50`}>
            <Notes className="m-8" />
        </div>
    );
};

export default SidePanel;
