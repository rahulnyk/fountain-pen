"use server";
import { JSONFilePreset } from "lowdb/node";
import { Descendant } from "slate";

type Article = {
    content: Descendant[];
};

interface DbData {
    articles: Article[];
}

const LowDb = async () => {
    const defaultData: DbData = { articles: [] };
    const db = await JSONFilePreset<DbData>("data/db.json", defaultData);
    return db;
};

export async function saveArticleContent({
    content,
    id = 0,
}: {
    content: Descendant[];
    id?: number;
}) {
    // console.log(content);
    const db = await LowDb();
    db.update(({ articles }) => {
        if (articles[id]) {
            articles[id].content = content;
        } else {
            articles.push({ content: content });
        }
    });
}

export async function getArticleContent({
    id = 0,
}: {
    id: number;
}): Promise<Descendant[] | null> {
    const db = await LowDb();
    const { articles } = db.data;
    const article = articles.at(id);
    return article && article.content ? article.content : null;
}
