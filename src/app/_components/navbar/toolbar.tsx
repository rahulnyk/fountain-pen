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
import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useSlate } from "slate-react";
import { Editor } from "slate";
import { ElementTypes } from "../main_editor/types";
import { Transforms } from "slate";

export const ToolBar = ({ className }: { className?: string }) => {
    const portalDiv = document.getElementById("toolbar-portal")!;
    return createPortal(
        <div
            className={clsx("flex z-99 rounded-lg space-x-0 px-2 items-center")}
        >
            {/* <MdOutlineTitle className="size-6 text-zinc-500 hover:text-black" /> */}
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
            {/* <FormatIconWraper targetType="quoted">
                <HiOutlineListBullet className="size-6" />
            </FormatIconWraper>
            <FormatIconWraper targetType="item-list">
                <LuTextQuote className="size-6" />
            </FormatIconWraper> */}
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
