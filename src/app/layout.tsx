import type { Metadata } from "next";
import "./globals.css";
import clsx from "clsx";
export const metadata: Metadata = {
    title: "Fountain Pen",
    description: "Write...",
};

import { Lato } from "next/font/google";

const lato = Lato({ weight: "400", subsets: ["latin"] });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={clsx(
                    "min-h-screen",
                    "bg-white dark:bg-zinc-950",
                    lato.className
                )}
            >
                {children}
            </body>
        </html>
    );
}
