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
                "focus:ring-4 focus:outline-none font-light rounded-lg text-sm px-3 py-1 text-center inline-flex items-center",
                "text-white bg-blue-600 hover:bg-blue-700  focus:ring-blue-300",
                "dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-900 dark:text-gray-200",
                className
            )}
        >
            {children}
        </button>
    );
}
