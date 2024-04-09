import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    active: boolean;
}

export function Button({ children, className, active, ...rest }: ButtonProps) {
    return (
        <button
            {...rest}
            type="button"
            className={clsx(
                "flex w-auto content-center justify-center",
                "focus:ring-4 focus:outline-none rounded-lg px-3 py-2",
                "text-white dark:text-zinc-200 text-xs font-normal",
                "bg-blue-600 hover:bg-blue-700  focus:ring-blue-300",
                "dark:bg-blue-800 dark:hover:bg-blue-900 dark:focus:ring-blue-950",
                !active &&
                    "dark:bg-blue-900 dark:text-zinc-400 hover:dark:bg-blue-900 hover:dark:text-zinc-400",
                !active &&
                    " bg-blue-300 text-zinc-200 hover:bg-blue-300 hover:text-zinc-200",
                className
            )}
            disabled={!active}
        >
            {children}
        </button>
    );
}
