"use client";

import clsx from "clsx";

export const FprAssistant = ({ className }: { className: string }) => {
    return (
        <div className={clsx("flwx w-full", className)}>
            <textarea rows={2} />
        </div>
    );
};
