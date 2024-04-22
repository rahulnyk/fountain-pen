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
                "text-white dark:text-zinc-200 text-xs font-normal",
                "bg-blue-600 hover:bg-blue-700  focus:ring-blue-300",
                "dark:bg-blue-800 dark:hover:bg-blue-900 dark:focus:ring-blue-950",
                !active &&
                    "dark:bg-blue-900 dark:text-zinc-500 hover:dark:bg-blue-900 hover:dark:text-zinc-500",
                !active &&
                    " bg-blue-200 text-zinc-100 hover:bg-blue-200 hover:text-zinc-100",
                className
            )}
            disabled={!active}
        >
            {loading ? <LoadingSpinner className="size-4" /> : children}
        </button>
    );
}
