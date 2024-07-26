"use server";
import { JSONFilePreset } from "lowdb/node";
import { Descendant } from "slate";
import { v4 as uuidv4 } from "uuid";
import { getWorkingDir, getDocumentsDir } from "../helpers/project_directory";

const main_db_file = "article.json";
const backup_db_file = "article_backup.json";
// const DIRECTORY = "data/wd";

type Article = {
    content: Descendant[];
};

export type References = {
    id: string;
    source: string;
    name: string;
    description?: string;
    type: "weblink" | "other";
};

interface DbData {
    /* 
    The article is an array because we may want to have sub 
    articles bunched up together in one single article at some point of time. 
    **/
    articles: Article[];
    references: References[];
}

const LDB = async (filename: string) => {
    const defaultData: DbData = { articles: [], references: [] };
    const wd = await getWorkingDir();
    if (!wd) {
        throw new Error("Not able to find the project directory");
    }
    const db = await JSONFilePreset<DbData>(`${wd}/${filename}`, defaultData);
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
    const db = await LDB(filename);
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
    const db = await LDB(filename);
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

export async function getReferences(): Promise<References[] | null> {
    const db = await LDB(main_db_file);
    const { references } = db.data;
    return references ? references : null;
}

export async function saveReferencesToDb({
    reference,
}: {
    reference: Omit<References, "id">;
}) {
    const id = uuidv4();
    const article = await LDB(main_db_file);
    const backup = await LDB(backup_db_file);
    article.update(({ references }) => {
        references.push({ ...reference, id });
    });
    backup.update(({ references }) => {
        references.push({ ...reference, id });
    });
    return { ...reference, id };
}

export async function deleteReferencesFromDb({ id }: { id: string }) {
    const article = await LDB(main_db_file);
    const backup = await LDB(backup_db_file);

    article.update(({ references }) => {
        const index = references.findIndex((reference) => reference.id == id);
        if (index > 0) {
            references.splice(index, 1);
        }
    });

    backup.update(({ references }) => {
        const index = references.findIndex((reference) => reference.id == id);
        if (index > 0) {
            references.splice(index, 1);
        }
    });
}
