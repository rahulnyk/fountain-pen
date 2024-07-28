import { Button } from "./_components/button";
import Link from "next/link";
import { Logo } from "./_components/navbar/logo";
import { generalText } from "./_components/main_editor/typography";
import clsx from "clsx";
export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24 space-y-0">
            <Logo size="lg" />
            <div
                className={clsx(
                    "rounded-full w-2/3 h-0.5",
                    "bg-gradient-to-r from-pink-700 via-indigo-500 to-blue-700"
                )}
            >
                <div>
                    <div className="w-20 h-20 -my-10 -mx-36 absolute rounded-full bg-purple-800 opacity-20"></div>
                    <div className="w-28 h-28 -my-14 -mx-56 absolute rounded-full bg-indigo-600 opacity-30"></div>
                    <div className="w-10 h-10 -m-5 -mx-14 absolute rounded-full bg-pink-800 opacity-50"></div>
                </div>
                <div className="flex justify-end">
                    {/* <div className="w-28 h-28 -my-14 -mx-56 absolute border border-white rounded-full bg-indigo-600 opacity-30"></div> */}
                    {/* <div className="w-20 h-20 -my-10 -mx-36 absolute border border-white rounded-full bg-purple-800 opacity-60"></div> */}
                    <div className="w-4 h-4 -m-2 -mx-8 absolute rounded-full bg-blue-700 "></div>
                    <div className="w-4 h-4 -m-2 -mx-16 absolute rounded-full bg-blue-700 "></div>
                    <div className="w-24 h-24 -my-6 mx-16 absolute rounded-full border border-blue-700 opacity-30"></div>
                </div>
            </div>
            <Link href="/editor">
                <Button className="my-10">
                    <div
                        className={clsx(
                            generalText.className,
                            "text-base font-extrabold px-2 py-0"
                        )}
                    >
                        START WRITING
                    </div>
                </Button>
            </Link>
        </main>
    );
}
