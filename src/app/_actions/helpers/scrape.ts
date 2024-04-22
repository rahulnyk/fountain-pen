"use server";

import { URL } from "url";
import * as cheerio from "cheerio";
import axios from "axios";

export default async function scrape({
    webLink,
}: {
    webLink: string;
}): Promise<string | null> {
    try {
        new URL(webLink as string);
    } catch (error) {
        console.error("Invalid URL:", error);
        return null;
    }

    try {
        const response = await axios.get(webLink as string);
        const $ = cheerio.load(response.data);

        // Extract title
        const title = $("title")
            .text()
            .replace(/<(\w+)>(.*?)<\/\1>/g, "");

        // Remove unwanted elements
        $("script").remove(); // Remove script tags
        $("style").remove(); // Remove style tags
        $("a").remove(); // Remove anchor tags
        $("[href]").removeAttr("href"); // Remove href attributes
        $("iframe").remove(); // Remove iframe tags
        $("header").remove();
        $("footer").remove();
        $("nav").remove(); // Remove nav
        $("script").each((index, item) => {
            if ("src" in item.attribs && !item.attribs.src.startsWith("http")) {
                $(item).remove();
            }
        });

        // Extract text content
        const content = $("body")
            .text()
            .replace(/^\s*\n/gm, "")
            .replace(/<(\w+)>(.*?)<\/\1>/g, "");

        return [title, content].join("\n");
    } catch (error) {
        console.error("Error scraping web page:", error);
        return null;
    }
}
