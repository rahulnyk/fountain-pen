"use server";
import { JSONFilePreset } from "lowdb/node";
import { Descendant } from "slate";

const main_db_file = "db.json";
const backup_db_file = "db_backup.json";
type Article = {
    content: Descendant[];
};

interface DbData {
    articles: Article[];
}

const LowDB = async (filename: string) => {
    const defaultData: DbData = { articles: [] };
    const db = await JSONFilePreset<DbData>(`data/${filename}`, defaultData);
    return db;
};

export async function saveArticleToDb({
    content,
    id = 0,
    filename = main_db_file,
}: {
    content: Descendant[];
    id?: number;
    filename?: string;
}) {
    const db = await LowDB(filename);
    db.update(({ articles }) => {
        if (articles[id]) {
            articles[id].content = content;
        } else {
            articles.push({ content });
        }
    });
}

export async function saveArticleContent({
    content,
    id = 0,
}: {
    content: Descendant[];
    id?: number;
}) {
    let res = await saveArticleToDb({
        content,
        id,
        filename: main_db_file,
    });
    return res;
}

export async function backupArticleContent({
    content,
    id = 0,
}: {
    content: Descendant[];
    id?: number;
}) {
    let res = await saveArticleToDb({
        content,
        id,
        filename: backup_db_file,
    });
    return res;
}

export async function getArticleContent({
    id = 0,
    filename = main_db_file,
}: {
    id: number;
    filename?: string;
}): Promise<Descendant[] | null> {
    const db = await LowDB(filename);
    const { articles } = db.data;
    const article = articles.at(id);
    return article && article.content ? article.content : null;
}

export async function getBackupContent({
    id = 0,
    filename = backup_db_file,
}: {
    id: number;
    filename?: string;
}) {
    const article = await getArticleContent({ id, filename });
    return article;
}
