import React from "react";
import { Spectral } from "next/font/google";
import { Inconsolata } from "next/font/google";

export const p = Spectral({
    weight: "400",
    subsets: ["latin"],
});

export const title = Spectral({
    weight: "700",
    subsets: ["latin"],
});

export const h1 = Spectral({
    weight: "600",
    subsets: ["latin"],
});

export const h2 = Spectral({
    weight: "600",
    subsets: ["latin"],
});

export const h3 = Spectral({
    weight: "600",
    subsets: ["latin"],
    style: "italic",
});

export const notes = Inconsolata({
    weight: '300',
    subsets: ['latin']
})


export const 
    paragraphStyle = `${p.className} text-xl pb-2`,
    heading1Style = `${h1.className} text-4xl pt-10 pb-5`,
    heading2Style = `${h2.className} text-3xl pt-10 pb-5`,
    heading3Style = `${h3.className} text-2xl pt-10 pb-2`,
    titleStyle = `${title.className} text-6xl pt-10 pb-5`;