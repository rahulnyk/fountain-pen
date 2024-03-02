import React from "react";
import { Spectral } from "next/font/google";
import { BasicWrapperProps } from "./types";
import { Inconsolata } from "next/font/google";

const p = Spectral({
    weight: "400",
    subsets: ["latin"],
});

const title = Spectral({
    weight: "700",
    subsets: ["latin"],
});

const h1 = Spectral({
    weight: "600",
    subsets: ["latin"],
});

const h2 = Spectral({
    weight: "600",
    subsets: ["latin"],
});

const h3 = Spectral({
    weight: "600",
    subsets: ["latin"],
    style: "italic",
});

export const notes = Inconsolata({
    weight: '300',
    subsets: ['latin']
})



export const NormalText: React.FC<BasicWrapperProps> = ({
    children,
    className,
}) => {
    return (
        <div className={`${className} ${p.className} text-xl pb-2`}>
            {children}
        </div>
    );
};

export const Heading1: React.FC<BasicWrapperProps> = ({
    children,
    className,
}) => {
    return (
        <div
            className={`${className} ${h1.className} text-4xl pt-10 pb-5 pl-0`}
        >
            {children}
        </div>
    );
};

export const Heading2: React.FC<BasicWrapperProps> = ({
    children,
    className,
}) => {
    return (
        <div
            className={`${className} ${h2.className} text-3xl pt-10 pb-5 pl-0`}
        >
            {children}
        </div>
    );
};

export const Heading3: React.FC<BasicWrapperProps> = ({
    children,
    className,
}) => {
    return (
        <div
            className={`${className} ${h3.className} text-2xl pt-10 pb-2 pl-0`}
        >
            {children}
        </div>
    );
};

export const Title: React.FC<BasicWrapperProps> = ({ children, className }) => {
    return (
        <div
            className={`${className} ${title.className} text-5xl pt-5 pb-5 pl-0`}
        >
            {children}
        </div>
    );
};


