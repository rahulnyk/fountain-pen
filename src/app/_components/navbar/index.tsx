// import { AddDocumentsButton } from "./add_documents_button";
import { Logo } from "./logo";
import { ToolBar } from "./toolbar";
import clsx from "clsx";

export const NavBar: React.FC = () => {
    return (
        <nav
            className={clsx(
                // "sticky rounded-full top-6 z-30 bg-opacity-70 mx-10 backdrop-filter backdrop-blur-xl border-[1px]",
                // "border-zinc-200  bg-zinc-200 dark:bg-zinc-600/50 dark:border-zinc-800",
                "sticky top-0 z-30 bg-opacity-50 py-1 px-2 backdrop-filter backdrop-blur-lg",
                "mx-0",
                "bg-white dark:bg-zinc-950/60",
                "border-[1px] border-white dark:border-zinc-950"
            )}
        >
            <div className="flex items-center justify-start h-12 max-w-8xl">
                {/* Left Div */}
                <div className="flex left align-middle">
                    <Logo className="" />
                    <ToolBar></ToolBar>
                </div>

                {/* Right Div*/}
                <div className="flex space-x-5 text-zinc-900 mx-5">
                    {/* <AddDocumentsButton /> */}
                </div>
            </div>
        </nav>
    );
};
