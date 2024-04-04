import {
    LuHeading1,
    LuHeading2,
    LuHeading3,
    LuTextQuote,
} from "react-icons/lu";
import { LiaParagraphSolid } from "react-icons/lia";
import { HiOutlineListBullet } from "react-icons/hi2";
import clsx from "clsx";

export const ToolBar = ({ className }: { className?: string }) => {
    return (
        <div
            className={clsx(
                "flex space-x-0 ml-12 divide-x-[1px] items-center divide-zinc-200 dark:divide-zinc-600"
            )}
        >
            {/* <MdOutlineTitle className="size-10 p-2 text-zinc-500 hover:text-black" /> */}
            <LuHeading1 className="size-10 p-2 text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-zinc-100" />
            <LuHeading2 className="size-9 p-2 text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-zinc-100" />
            <LuHeading3 className="size-8 p-2 text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-zinc-100" />
            <LiaParagraphSolid className="size-10 p-2 text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-zinc-100" />
            <HiOutlineListBullet className="size-10 p-2 text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-zinc-100" />
            <LuTextQuote className="size-10 p-2 text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-zinc-100" />
        </div>
    );
};
