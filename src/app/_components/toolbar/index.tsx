import { PiPenNibStraightBold } from "react-icons/pi";
import { ToolButton } from "./tool_button";
import { AddDocumentsButton } from "./add_documents_button";
import { LuHeading1 } from "react-icons/lu";
import { LuHeading2 } from "react-icons/lu";
import { LuHeading3 } from "react-icons/lu";
import { MdOutlineTitle } from "react-icons/md";
import { LiaParagraphSolid } from "react-icons/lia";
import { HiOutlineListBullet } from "react-icons/hi2";
import { LuTextQuote } from "react-icons/lu";
import clsx from "clsx";

export const ToolBar: React.FC = () => {
    return (
        <nav
            className={clsx(
                "sticky rounded-full top-5 z-30 bg-opacity-70 mx-5 backdrop-filter backdrop-blur-lg px-10 border-[1px]",
                "border-zinc-200  bg-zinc-200 dark:bg-zinc-600/50 dark:border-zinc-800"
            )}
        >
            <div className="max-w-8xl mx-auto px-0">
                <div className="flex items-center justify-between h-12">
                    <span className="text-2xl text-zinc-900 font-semibold">
                        <PiPenNibStraightBold
                            className={clsx(
                                "size-10 rounded-full p-2 absolute left-1 top-1",
                                "text-black bg-white dark:text-zinc-100 dark:bg-zinc-500"
                            )}
                        />
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
                    </span>
                    <div className="flex space-x-5 text-zinc-900">
                        {/* <button>Projects</button> */}
                        <AddDocumentsButton />
                        {/* <button>Theme</button> */}
                    </div>
                </div>
            </div>
        </nav>
    );
};
