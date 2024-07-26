"use client";
import clsx from "clsx";
import { MouseEventHandler, ReactNode } from "react";
import { generalTextStyle } from "../main_editor/typography";
import { Button } from "../button";

interface CustomComponentProps {
    children: ReactNode;
    subheadingText?: string;
    buttonText?: string;
    buttonActive?: boolean;
    isWaiting?: boolean;
    onClick?: MouseEventHandler;
    className?: string;
    buttonVisible?: boolean;
}

export const TabPanel: React.FC<CustomComponentProps> = ({
    className,
    children,
    onClick,
    subheadingText = null,
    buttonText = null,
    isWaiting = false,
    buttonActive = true,
    buttonVisible = true,
}) => {
    return (
        <>
            <div
                className={clsx(
                    "flex-col flex-grow px-4 py-5 flex-wrap w-full",
                    className,
                    generalTextStyle
                )}
            >
                {/* Header and refresh button */}
                {buttonVisible && (
                    <Button
                        onClick={onClick}
                        active={buttonActive}
                        className="text-xs font-normal"
                        loading={isWaiting}
                    >
                        {buttonText}
                    </Button>
                )}

                {subheadingText && (
                    <div className="text-xs font-normal text-zinc-500 dark:text-zinc-400 mb-5 pb-5 pt-4 w-full">
                        {subheadingText}
                    </div>
                )}

                {/* Main content */}
                {children}
            </div>
        </>
    );
};
