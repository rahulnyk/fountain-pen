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
    weight: "300",
    subsets: ["latin"],
});

export const paragraphStyle = `${p.className} text-xl my-2`,
    titleStyle = `${title.className} text-6xl my-2 pt-6 pb-0`,
    heading1Style = `${h1.className} text-4xl my-2 pt-6 pb-0`,
    heading2Style = `${h2.className} text-3xl my-2 pt-6 pb-0`,
    heading3Style = `${h3.className} text-2xl my-2 pt-6 pb-0`;
