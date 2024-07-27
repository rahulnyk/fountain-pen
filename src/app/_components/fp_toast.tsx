import toast, { Toaster, resolveValue } from "react-hot-toast";
import clsx from "clsx";
import { generalText } from "./main_editor/typography";
import { FaInfo } from "react-icons/fa";
import { FaRegCircleCheck } from "react-icons/fa6";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
interface FpToasterProps {
    // message: string,
    className?: string;
}

export function FpToaster({ className }: FpToasterProps) {
    return (
        <Toaster position="bottom-right" gutter={8}>
            {(t) => (
                <div
                    className={clsx(
                        "flex flex-inline space-x-3 justify-center items-center shadow-md",
                        "border-left-2 border-white text-bold",
                        generalText.className,
                        "rounded-lg p-4 px-6 m-12 w-auto min-w-60",
                        t.type == "blank" &&
                            "bg-indigo-100 dark:bg-indigo-900 text-indigo-900 dark:text-indigo-100",
                        t.type == "error" &&
                            "bg-rose-100 dark:bg-rose-800 text-rose-800 dark:text-rose-100",
                        t.type == "success" &&
                            "bg-emerald-100 dark:bg-emerald-800 text-emerald-100 dark:text-emerald-100"
                    )}
                >
                    <div className="size-10">
                        {t.type == "blank" && <FaInfo className="size-8" />}
                        {t.type == "success" && (
                            <FaRegCircleCheck className="size-8" />
                        )}
                        {t.type == "error" && (
                            <MdOutlineReportGmailerrorred className="size-8" />
                        )}
                    </div>
                    <div className="">{resolveValue(t.message, t)}</div>
                </div>
            )}
        </Toaster>
    );
}
