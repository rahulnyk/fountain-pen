"use client";

import clsx from "clsx";

export const FprAssistant = ({ className }: { className?: string }) => {
    return (
        <div
            className={clsx(
                "flex-grow w-full h-auto min-h-96 rounded bg-gradient-to-br from-slate-100 to-slate-50 p-1",
                "border-l-4 border-indigo-500",
                className
            )}
        ></div>
    );
};
