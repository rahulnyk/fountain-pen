"use client";
import { useState } from "react";
import ArticleEditor from "../components/editor/article_editor";


export default function Editor() {


    return (
        <div className="flex h-full">
            {/* First Column (2/3 width) */}
            <div className="w-2/3 p-5 bg-white">
                <div className="pt-10">
                    <ArticleEditor/>
                </div>

            </div>

            {/* Second Column (1/3 width) */}
            <div className="w-1/3 p-5 bg-gray-300">
                <div className="pt-20 ">
                </div>
            </div>
        </div>
    );
}