"use client";

import clsx from "clsx";

export const FprAssistant = ({
    className,
    action,
}: {
    className?: string;
    action: any;
}) => {
    const handleClick = () => {
        action();
    };

    return (
        <div
            className={clsx(
                "flex-grow w-full rounded-md bg-gradient-to-r from-indigo-600 via-indigo-400 to-indigo-400 p-1",
                className
            )}
            onClick={handleClick}
        >
            <div className="bg-gray-50 rounded-md p-0">
                <textarea
                    rows={1}
                    className="p-1 rounded w-full resize-none bg-gray-50 focus:outline-none"
                />
            </div>
        </div>
    );
};
