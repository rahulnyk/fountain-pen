import clsx from "clsx";
import { MouseEventHandler } from "react";

export type dropDownOptions = {
    action: string;
    display: string;
    id: string;
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
                {dropDownItems.display}
            </div>
        </li>
    );
};
