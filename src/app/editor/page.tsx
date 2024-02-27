"use client"
import ArticleEditor from "../components/editor/article_editor";

export default function Editor() {
    const handleMarkdownChange = (value: string) => {
        // You can perform any additional actions with the markdown content here
        console.log(value);
      };
    return (
        <div className="flex h-full">
            {/* First Column (2/3 width) */}
            <div className="w-2/3 p-8 bg-white">
                <div className="pt-20 ">
                    {/* <h1 className="text-2xl font-bold">First Column</h1> */}
                </div>
                <ArticleEditor />
                {/* Your content for the first column goes here */}
            </div>

            {/* Second Column (1/3 width) */}
            <div className="w-1/3 p-8 bg-gray-300">
                <div className="pt-20 ">
                    {/* <h1 className="text-2xl font-bold">Second Column</h1> */}
                </div>
                {/* Your content for the second column goes here */}
            </div>
        </div>
    );
}
