import clsx from "clsx";
import ReactMarkdown from 'react-markdown';


export const ContentCard = ({ content }: { content: string }) => {
    return (
        <div
            className={clsx(
                "flex-col flex-grow rounded py-4 mx-0 text-pretty ",
                "text-zinc-500 dark:text-zinc-400"
            )}
        >
            <div
                className={clsx(
                    "whitespace-pre-wrap text-sm",
                )}
            >
                <ReactMarkdown>
                    {content}
                </ReactMarkdown>
            </div>
            <hr className="dark:border-zinc-700 my-4" />
        </div>
    );
};
