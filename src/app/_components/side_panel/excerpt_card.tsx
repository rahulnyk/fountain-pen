import { Document } from "langchain/document";
import { Open_Sans } from "next/font/google";
import { Lato } from "next/font/google";
import clsx from "clsx";

export const textStyle = Lato({
    subsets: ["latin"],
    weight: "300",
});

export const ExcerptCard = ({ document }: { document: Document }) => {
    const filenameFromPath = (path: string) => {
        const filename = path.split("/").pop();
        return filename;
    };

    const sanitizePDFText = (pdfText: string) => {
        // Replace newline characters with <br> tags
        let text = pdfText.replace(/\n/g, "<br>");

        // Normalize spaces
        text = text.replace(/\s+/g, " ");

        // Trim leading and trailing whitespace
        text = text.trim();

        return text;
    };

    return (
        <div
            className={clsx(
                "flex-col flex-grow rounded p-4 mx-0 text-pretty ",
                " text-black dark:text-zinc-400"
            )}
        >
            <p
                className={clsx(
                    "my-1 -mx-1 text-ellipsis overflow-hidden text-xs p-2 rounded",
                    "bg-cyan-100 dark:bg-cyan-900/30"
                )}
            >
                <span className="font-bold">
                    {filenameFromPath(document.metadata?.source)}
                </span>
                <br />
                Page: {document?.metadata?.loc?.pageNumber}
            </p>
            {/* <p className="whitespace-pre-wrap break-normal font-light">
                {sanitizePDFText(document.pageContent)}
            </p> */}
            <div
                className={clsx(
                    "whitespace-pre-wrap break-normal font-light text-sm",
                    textStyle
                )}
                dangerouslySetInnerHTML={{
                    __html: sanitizePDFText(document.pageContent),
                }}
            />
            <hr className="mt-2" />
        </div>
    );
};
