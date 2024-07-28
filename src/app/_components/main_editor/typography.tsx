import React from "react";
import { Poppins } from "next/font/google";
import { Inconsolata } from "next/font/google";
import { Shantell_Sans } from "next/font/google";
import { Playpen_Sans } from "next/font/google";
import { Open_Sans } from "next/font/google";
import { Lato } from "next/font/google";
import { Spectral } from "next/font/google";

export const generalText = Poppins({
    subsets: ["latin"],
    weight: "400",
});

export const generalTextLight = Poppins({
    subsets: ["latin"],
    weight: "300",
});

// export const p = Poppins({
//     weight: "400",
//     subsets: ["latin"],
// });

export const p = Poppins({
    weight: "400",
    subsets: ["latin"],
});

export const title = Poppins({
    weight: "700",
    subsets: ["latin"],
});

export const h1 = Poppins({
    weight: "600",
    subsets: ["latin"],
});

export const h2 = Poppins({
    weight: "600",
    subsets: ["latin"],
});

export const h3 = Poppins({
    weight: "600",
    subsets: ["latin"],
    style: "italic",
});

export const notes = Playpen_Sans({
    weight: "300",
    subsets: ["latin"],
});

export const paragraphStyle = `${p.className} text-base my-1 dark:text-zinc-200`,
    heading3Style = `${h3.className} text-xl my-2 pt-4 pb-4 dark:text-zinc-200 font-bold`,
    heading2Style = `${h2.className} text-3xl my-2 pt-4 pb-4 dark:text-zinc-200 font-bold`,
    heading1Style = `${h1.className} text-4xl my-2 pt-4 pb-4 dark:text-zinc-200 font-bold`,
    titleStyle = `${title.className} text-5xl my-2 pt-4 pb-4 dark:text-zinc-200 font-extrabold`,
    notesStyle = `${notes.className} text-sm text-indigo-600 dark:text-indigo-300`,
    generalTextStyle = `${generalText.className} text-normal text-zinc-900 dark:text-zinc-100 text-ellipsis`,
    generalTextStyleLight = `${generalTextLight.className} text-sm text-zinc-800 dark:text-zinc-200 text-ellipsis`;
