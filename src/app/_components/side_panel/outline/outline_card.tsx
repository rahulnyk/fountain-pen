import clsx from "clsx";
import { outlineResponse } from "@/app/_actions/rag/generate_outline";
import {
    generalTextStyle,
    generalTextStyleLight,
} from "../../main_editor/typography";
import { RiArrowLeftDoubleFill } from "react-icons/ri";
import { useSlate } from "slate-react";
import { Transforms, Path } from "slate";
import { CustomElement } from "../../main_editor/types";

export const OutlineCard = ({
    item,
    index,
    removeItem,
}: {
    item: outlineResponse;
    index: number;
    removeItem: (index: number) => void;
}) => {
    const editor = useSlate();

    const handleInsert = () => {
        if (!editor.selection) {
            return;
        }
        insertElement();
        removeItem(index);
    };

    const insertElement = () => {
        const type = item.level === "heading" ? "heading1" : "heading2";
        const element: CustomElement = {
            type,
            children: [{ text: item.text }],
            notes: [item.description ? item.description : ""],
        };
        const elementEntry = editor.getCurrentElement();
        if (elementEntry) {
            const [, currentElementPath] = elementEntry;
            Transforms.insertNodes(editor, element, {
                at: Path.next(currentElementPath),
            });
            editor.select(Path.next(currentElementPath));
        }
    };
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
                {/* Icon */}
                <div
                    className={clsx(
                        "flex items-center justify-center rounded-full size-6 p-1",
                        "focus:ring-4 focus:outline-none",
                        "dark:bg-blue-700 dark:hover:bg-blue-900 dark:text-gray-200",
                        "bg-blue-400 hover:bg-blue-600 text-white"
                    )}
                >
                    <RiArrowLeftDoubleFill
                        onClick={handleInsert}
                        className="size-4"
                    />
                </div>

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
