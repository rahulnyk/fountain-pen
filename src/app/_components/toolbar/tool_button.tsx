import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export function ToolButton({ children, className, ...rest }: ButtonProps) {
    return (
        <button
            {...rest}
            type="button"
            className={clsx(
                "text-indigo-200 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-1 focus:outline-none focus:ring-gray-100 font-light rounded-lg text-xs px-2 py-1 text-center inline-flex items-center dark:focus:ring-indigo-800 dark:bg-indigo-600 dark:border-indigo-600 dark:text-white dark:hover:bg-indigo-700 me-2",
                className
            )}
        >
            {children}
        </button>
    );
}
