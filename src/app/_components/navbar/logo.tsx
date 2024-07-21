import { PiPenNibStraightBold } from "react-icons/pi";
import clsx from "clsx";
import { Dancing_Script } from "next/font/google";
import { Caveat } from "next/font/google";
const logoText = Caveat({
    weight: "500",
    subsets: ["latin"],
});

export const Logo = ({
    className,
    size,
}: {
    className?: string;
    size?: "md" | "lg";
}) => {
    size = size ? size : "md";
    return (
        <div
            className={clsx(
                "flex space-x-1 text-black dark:text-zinc-300 align-middle p-1",
                className,
                size == "lg" && "flex-col justify-center items-center"
            )}
        >
            <PiPenNibStraightBold
                className={clsx(
                    size == "md" && "size-10 rounded-full p-2",
                    size == "lg" && "size-14 rounded-full p-2"
                    // "bg-white dark:bg-zinc-800"
                )}
            ></PiPenNibStraightBold>
            <span>
                <p
                    className={clsx(
                        logoText.className,
                        size == "md" && "font-medium text-2xl p-1",
                        size == "lg" && "font-medium text-4xl p-2"
                    )}
                >
                    Fountain Pen
                </p>
            </span>
        </div>
    );
};
