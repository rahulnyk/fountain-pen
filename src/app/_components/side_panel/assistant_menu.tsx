"use client";
import clsx from "clsx";
import { useState } from "react";
import { AssistantMenuItem, dropDownOptions } from "./assistant_menu_items";
import { AssistantPanel } from "./assistant_panel";

const dropDownOptions: dropDownOptions[] = [
    {
        action: "generateHeadings",
        display: "Generate Headings",
        id: "dropdown_1",
    },
    {
        action: "suggestFromResearch",
        display: "Suggest Content From My Research",
        id: "dropdown_2",
    },
    {
        action: "semanticSearch",
        display: "Search Exerpts In My Documents",
        id: "dropdown_3",
    },
];

export const AssistantMenu: React.FC = ({
    className,
}: {
    className?: string;
}) => {
    const [dropDown, setDropDown] = useState(false);
    const [currentOption, setCurrentOption] = useState<
        dropDownOptions | undefined
    >();

    const handleClick = () => {
        setDropDown(!dropDown);
    };

    const onClick = (item: dropDownOptions) => {
        setCurrentOption(item);
        setDropDown(false);
    };

    return (
        <div className="flex-col space-y-3 px-1">
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
            >
                IA Assistant
            </button>

            <div
                id="dropdownInformation"
                className={clsx(
                    "absolute w-auto z-10 rounded-lg shadow dark:bg-gray-700  bg-gray-50",
                    dropDown ? "visible" : "invisible"
                )}
            >
                <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                    <div>What would you like me to do?</div>
                </div>
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 divide-y divide-gray-50 dark:divide-gray-600">
                    {dropDownOptions.map((item) => (
                        <AssistantMenuItem
                            key={item.id}
                            dropDownItems={item}
                            onClick={() => onClick(item)}
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        />
                    ))}
                </ul>
            </div>
            <div className={clsx()}>
                {currentOption && (
                    <AssistantPanel dropDownItem={currentOption} />
                )}
            </div>
        </div>
    );
};
