"use client";
import FprEditor from "../components/fpr_editor";

export default function Editor() {
    return (
        <div className="flex h-full">
            {/* First Column (2/3 width) */}
            <div className="w-2/3 bg-white">
                <div className="pt-10">
                    <FprEditor />
                </div>
            </div>

            {/* Second Column (1/3 width) */}
            <div className="w-1/3 bg-gray-50">
                <div className="pt-20 "></div>
            </div>
        </div>
    );
}
