"use client";
import {
    LuHeading1,
    LuHeading2,
    LuHeading3,
    LuTextQuote,
} from "react-icons/lu";
import { LiaParagraphSolid } from "react-icons/lia";
import { HiOutlineListBullet } from "react-icons/hi2";
import clsx from "clsx";
import { ReactNode } from "react";

export const ToolBar = ({ className }: { className?: string }) => {
    return (
        <div
            className={clsx("flex z-99 rounded-lg space-x-2 px-2 items-center")}
        >
            {/* <MdOutlineTitle className="size-6 text-zinc-500 hover:text-black" /> */}
            <FormatIconWraper targetType="heading">
                <LuHeading1 className="size-6 text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-zinc-100" />
            </FormatIconWraper>
            <FormatIconWraper targetType="heading">
                <LuHeading2 className="size-6 text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-zinc-100" />
            </FormatIconWraper>
            <FormatIconWraper targetType="heading">
                <LuHeading3 className="size-6 text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-zinc-100" />
            </FormatIconWraper>
            <FormatIconWraper targetType="heading">
                <LiaParagraphSolid className="size-6 text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-zinc-100" />
            </FormatIconWraper>
            <FormatIconWraper targetType="heading">
                <HiOutlineListBullet className="size-6 text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-zinc-100" />
            </FormatIconWraper>
            <FormatIconWraper targetType="heading">
                <LuTextQuote className="size-6 text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-zinc-100" />
            </FormatIconWraper>
        </div>
    );
};

const FormatIconWraper = ({
    children,
    targetType,
}: {
    children: ReactNode;
    targetType: string;
}) => {
    const handleClick = (type: string) => {};

    return (
        <div
            className="p-2 content-center justify-center align-middle hover:cursor-pointer"
            onClick={() => handleClick(targetType)}
        >
            {children}
        </div>
    );
};
