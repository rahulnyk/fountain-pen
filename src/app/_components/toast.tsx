


import clsx from "clsx";
// import { LoadingSpinner } from "./loading_spinner";

interface ToastProps {
    children: React.ReactNode;
    className?: string;
    // active?: boolean;
    // loading?: boolean;
    type?: "error" | "info" | "success" | undefined;
}

export function Toast({
    children,
    className,
    type,
    ...rest
}: ToastProps) {
    return (
        <div className="toast toast-end">
            <div className="alert alert-info">
                <span>{children}</span>
            </div>
        </div>
    )
}


