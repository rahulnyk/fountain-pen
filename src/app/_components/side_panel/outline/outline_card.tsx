import clsx from "clsx";
import { outlineResponse } from "@/app/_actions/rag/generate_outline";
import {
    generalTextStyle,
    generalTextStyleLight,
} from "../../main_editor/typography";

export const OutlineCard = ({
    item,
    index,
}: {
    item: outlineResponse;
    index: number;
}) => {
    return (
        <div
            className={clsx(
                "flex-col flex-grow rounded space-y-2",
                "text-zinc-700 dark:text-zinc-200"
                // item.level === "subheading" && "ml-8"
            )}
        >
            <div
                className={clsx(
                    "flex space-x-2 item-center h-auto",
                    "bg-blue-50 dark:bg-blue-900/30 text-md p-2 rounded-md"
                )}
            >
                {/* Text */}
                <div className={clsx(generalTextStyle, "text-ellipsis")}>
                    {item.text}
                </div>
            </div>

            <p className={clsx("pb-6 px-2", generalTextStyleLight)}>
                {item.description}
            </p>
        </div>
    );
};
