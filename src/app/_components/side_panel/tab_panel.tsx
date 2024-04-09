"use client";
import clsx from "clsx";
import { MouseEventHandler, ReactNode } from "react";
import { LoadingSpinner } from "../loading_spinner";
import { generalTextStyle } from "../main_editor/typography";
import { Button } from "../button";

interface CustomComponentProps {
    children: ReactNode;
    subheadingText: string;
    onClick: MouseEventHandler;
    buttonActive: boolean;
    isWaiting: boolean;
    className?: string;
}

export const TabPanel: React.FC<CustomComponentProps> = ({
    className,
    isWaiting,
    children,
    subheadingText,
    onClick,
    buttonActive,
}) => {
    return (
        <>
            <div
                className={clsx(
                    "flex flex-grow px-4 py-5 flex-wrap",
                    className,
                    generalTextStyle
                )}
            >
                {/* Header and refresh button */}
                <Button
                    onClick={onClick}
                    active={buttonActive}
                    className="text-xs font-normal"
                >
                    GENERATE OUTLINE
                </Button>

                <div className="text-xs font-normal text-zinc-500 dark:text-zinc-400 mb-5 pb-5 pt-4 w-full">
                    {subheadingText}
                </div>

                {/* Main content */}
                {isWaiting ? (
                    <LoadingSpinner className="size-10 align-middle justify-center p-4 m-10" />
                ) : (
                    children
                )}
            </div>
        </>
    );
};
