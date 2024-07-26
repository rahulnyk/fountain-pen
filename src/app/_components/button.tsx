import clsx from "clsx";
import { LoadingSpinner } from "./loading_spinner";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    active?: boolean;
    loading?: boolean;
    type?: "submit" | "reset" | "button" | undefined;
}

export function Button({
    children,
    className,
    active = true,
    loading = false,
    type = "button",
    ...rest
}: ButtonProps) {
    return (
        <button
            {...rest}
            type={type}
            className={clsx(
                "flex w-auto content-center justify-center",
                "focus:ring-4 focus:outline-none rounded-lg px-3 py-2",
                "text-black-900 dark:text-zinc-200 text-xs font-normal",
                "bg-gradient-to-r from-indigo-300 to-blue-300",
                "dark:bg-gradient-to-r dark:from-indigo-700 dark:to-blue-700",
                active && "hover:bg-gradient-to-r hover:from-indigo-200 hover:to-blue-200",
                active && "dark:hover:bg-gradient-to-r dark:hover:from-indigo-800 dark:hover:to-blue-800",
                !active && "opacity-50",
                className
            )}
            disabled={!active}
        >
            {loading ? <LoadingSpinner className="size-4" /> : children}
        </button>
    );
}
