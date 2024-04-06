import clsx from "clsx";
import { MouseEventHandler } from "react";

export type dropDownOptions = {
    action: string;
    display: string;
    id: string;
    description?: string;
    icon?: JSX.Element;
};

export const AssistantMenuItem = ({
    className,
    dropDownItems,
    onClick,
}: {
    className?: string;
    dropDownItems: dropDownOptions;
    onClick: MouseEventHandler;
}) => {
    return (
        <li>
            <div className={clsx(className)} onClick={onClick}>
                <div className="flex space-x-0 item-center">
                    <div>{dropDownItems.icon ? dropDownItems.icon : null}</div>
                    <div>{dropDownItems.display}</div>
                </div>
                {dropDownItems?.description && (
                    <div className="text-xs font-normal text-gray-500 dark:text-gray-400 mb-4 mt-2">
                        {dropDownItems.description}
                    </div>
                )}
            </div>
        </li>
    );
};
