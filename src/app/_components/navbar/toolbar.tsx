"use client";
import {
    LuHeading1,
    LuHeading2,
    LuHeading3,
    LuTextQuote,
    LuBold,
    LuItalic,
    LuUnderline,
} from "react-icons/lu";
import {
    MdOutlineFormatBold,
    MdOutlineFormatItalic,
    MdOutlineFormatUnderlined,
} from "react-icons/md";
import { LiaParagraphSolid } from "react-icons/lia";
import { HiOutlineListBullet } from "react-icons/hi2";
import clsx from "clsx";
import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useSlate } from "slate-react";
import { Editor } from "slate";
import { ElementTypes, Marks } from "../main_editor/types";
import { Transforms } from "slate";

export const ToolBar = ({ className }: { className?: string }) => {
    const portalDiv = document.getElementById("toolbar-portal")!;
    return createPortal(
        <div
            className={clsx("flex z-99 rounded-lg space-x-3 px-2 items-center")}
        >
            {/* <MdOutlineTitle className="size-6 text-zinc-500 hover:text-black" /> */}
            <div
                className={clsx(
                    "flex space-x-0 rounded-full px-2 mt-2",
                    "bg-white dark:bg-black opacity-70"
                )}
            >
                <FormatIconWraper targetType="paragraph">
                    <LiaParagraphSolid className="size-6" />
                </FormatIconWraper>
                <FormatIconWraper targetType="heading1">
                    <LuHeading1 className="size-6" />
                </FormatIconWraper>
                <FormatIconWraper targetType="heading2">
                    <LuHeading2 className="size-6" />
                </FormatIconWraper>
                <FormatIconWraper targetType="heading3">
                    <LuHeading3 className="size-6" />
                </FormatIconWraper>
            </div>
            <div
                className={clsx(
                    "flex space-x-0 rounded-full px-2 mt-2",
                    "bg-white dark:bg-black opacity-70"
                )}
            >
                <TextMarkIconWrapper mark="bold">
                    <MdOutlineFormatBold className="size-5" />
                </TextMarkIconWrapper>
                <TextMarkIconWrapper mark="italic">
                    <MdOutlineFormatItalic className="size-5" />
                </TextMarkIconWrapper>
                <TextMarkIconWrapper mark="underline">
                    <MdOutlineFormatUnderlined className="size-5" />
                </TextMarkIconWrapper>
            </div>
        </div>,
        portalDiv
    );
};

const FormatIconWraper = ({
    children,
    targetType,
}: {
    children: ReactNode;
    targetType: ElementTypes;
}) => {
    const editor = useSlate();

    const handleClick = (type: string) => {
        console.log(targetType);
        if (editor && editor.selection) {
            Transforms.setNodes(editor, { type: targetType });
        }
    };

    return (
        <div
            className={clsx(
                "p-2 content-center justify-center align-middle hover:cursor-pointer",
                " text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-zinc-100"
                // inactive() && "text-zinc-200 dark:text-zinc-600"
            )}
            onClick={() => handleClick(targetType)}
        >
            {children}
        </div>
    );
};

const TextMarkIconWrapper = ({
    children,
    mark,
}: {
    children: ReactNode;
    mark: Marks;
}) => {
    const editor = useSlate();

    const handleClick = (mark: Marks) => {
        console.log(mark);
        if (editor && editor.selection) {
            editor.toggleMark(mark);
        }
    };

    return (
        <div
            className={clsx(
                "p-2 content-center justify-center align-middle hover:cursor-pointer",
                " text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-zinc-100"
                // inactive() && "text-zinc-200 dark:text-zinc-600"
            )}
            onClick={() => handleClick(mark)}
        >
            {children}
        </div>
    );
};
