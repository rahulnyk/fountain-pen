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

export const ToolBar: React.FC = () => {
    return (
        <nav className="sticky rounded-full top-5 z-30 bg-opacity-70 mx-5 bg-gray-200 backdrop-filter backdrop-blur-lg px-10 border-[1px] border-gray-200">
            <div className="max-w-8xl mx-auto px-0">
                <div className="flex items-center justify-between h-12">
                    <span className="text-2xl text-gray-900 font-semibold">
                        <PiPenNibStraightBold className="size-10 text-black bg-white rounded-full p-2 absolute left-1 top-1" />
                        <div className="flex space-x-0 ml-12 divide-x-[1px]  divide-gray-200 items-center">
                            {/* <MdOutlineTitle className="size-10 p-2 text-gray-500 hover:text-black" /> */}
                            <LuHeading1 className="size-10 p-2 text-gray-500 hover:text-black" />
                            <LuHeading2 className="size-9 p-2 text-gray-500 hover:text-black" />
                            <LuHeading3 className="size-8 p-2 text-gray-500 hover:text-black" />
                            <LiaParagraphSolid className="size-10 p-2 text-gray-500 hover:text-black" />
                            <HiOutlineListBullet className="size-10 p-2 text-gray-500 hover:text-black" />
                            <LuTextQuote className="size-10 p-2 text-gray-500 hover:text-black" />
                        </div>
                    </span>
                    <div className="flex space-x-5 text-gray-900">
                        {/* <button>Projects</button> */}
                        <AddDocumentsButton />
                        {/* <button>Theme</button> */}
                    </div>
                </div>
            </div>
        </nav>
    );
};
