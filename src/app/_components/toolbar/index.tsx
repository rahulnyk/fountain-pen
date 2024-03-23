import { PiPenNibStraightBold } from "react-icons/pi";
import { ToolButton } from "./tool_button";
import { AddDocumentsButton } from "./add_documents_button";
export const ToolBar: React.FC = () => {
    return (
        <nav className="sticky rounded-full top-5 z-30 bg-opacity-70 mx-5 bg-gray-200 backdrop-filter backdrop-blur-lg px-10 border-[1px] border-gray-200">
            <div className="max-w-8xl mx-auto px-0">
                <div className="flex items-center justify-between h-12">
                    <span className="text-2xl text-gray-900 font-semibold">
                        <PiPenNibStraightBold className="size-6 text-black" />
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
