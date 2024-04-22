import { Lato } from "next/font/google";
import clsx from "clsx";
import { useEffect } from "react";
import { References } from "@/app/_actions/ldb";
import { RxLinkNone2 } from "react-icons/rx";
export const textStyle = Lato({
    subsets: ["latin"],
    weight: "300",
});

export const ReferencesCard = ({ item }: { item: Omit<References, "id"> }) => {
    return (
        <div
            className={clsx(
                "flex-col flex-grow w-full rounded mb-8 mx-0 text-pretty ",
                "text-zinc-500 dark:text-zinc-400"
            )}
        >
            <div
                className={clsx(
                    "flex-col items-start space-y-2",
                    "whitespace-pre-wrap break-normal font-normal text-sm",
                    textStyle
                )}
            >
                <div className="flex justify-normal content-center align-middle space-x-2">
                    <div>
                        <RxLinkNone2 className="size-5" />
                    </div>
                    <div>
                        <a
                            href={item.source}
                            target="_blank"
                            className="font-bold text-base"
                        >
                            {item.name}
                        </a>
                        {item.description && (
                            <div className="text-xs">{item.description}</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
