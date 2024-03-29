"use client";
import { semanticSearch } from "@/app/_actions/vector_store";
import clsx from "clsx";
import { ExcerptCard } from "./excerpt_card";
import { Document } from "langchain/document";
import { useState } from "react";
import { HiOutlineDocumentSearch } from "react-icons/hi";
import { useSlate } from "slate-react";
import { CustomBaseElement } from "../main_editor/types";
import { LoadingSpinner } from "../loading_spinner";
import { MdExpandLess } from "react-icons/md";
import { MdExpandMore } from "react-icons/md";
import { PiDog } from "react-icons/pi";

type dropDownOption = {
    action: string;
    display: string;
    id: string;
};

const dropDownOptions: dropDownOption[] = [
    {
        action: "generateHeadings",
        display: "Generate Headings",
        id: "dripdown_1",
    },
    {
        action: "suggestFromResearch",
        display: "Suggest Content From My Research",
        id: "dripdown_2",
    },
];

export const Assistant: React.FC = ({ className }: { className?: string }) => {
    const [dropDown, setDropDown] = useState(false);

    const handleClick = () => {
        setDropDown(!dropDown);
    };

    const handleBlur = () => {
        console.log("blur");
        setDropDown(false);
    };

    return (
        <div className="flex-col space-y-3 px-1 ">
            <button
                id="dropdownInformationButton"
                className={clsx(
                    "focus:ring-4 focus:outline-none font-light rounded-lg text-sm px-5 py-2.5 inline-flex",
                    "dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-900 dark:text-gray-200",
                    "text-white bg-blue-600 hover:bg-blue-700  focus:ring-blue-300",
                    "w-full items-center text-center justify-center"
                )}
                type="button"
                onClick={handleClick}
                onBlur={handleBlur}
            >
                IA Assistant
            </button>

            <div
                id="dropdownInformation"
                className={clsx(
                    "z-10 bg-gray-50 rounded-lg shadow dark:bg-gray-700 w-full",
                    dropDown ? "visible" : "invisible"
                )}
            >
                <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                    <div>What would you like me to do?</div>
                </div>
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 divide-y divide-gray-50 dark:divide-gray-600">
                    {dropDownOptions.map((item) => (
                        <MenuItem
                            dropDownItem={item}
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        />
                    ))}
                    {/* <li>
                        <a
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            Dashboard
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            Settings
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            Earnings
                        </a>
                    </li> */}
                </ul>
            </div>
        </div>
    );
};

export const MenuItem = ({
    className,
    dropDownItem,
}: {
    className?: string;
    dropDownItem: dropDownOption;
}) => {
    return (
        <li>
            <div className={clsx(className)}>{dropDownItem.display}</div>
        </li>
    );
};
