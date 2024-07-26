// import * as fs from "fs/promises";
import * as fs from "fs";

const project_dir = process.env.PROJECT_DIR;
const baseDir = "data";
const projPath = `${baseDir}/${project_dir}`;
const workingDirName = "wd";
const documentsDirName = "documents";
// Default directories in case the project directory fail to be created.
// const defaultWorkingDir = `${baseDir}/${workingDirName}`;
// const defaultDocumentsDir = `${baseDir}/${documentsDirName}`;

async function createDirectory(path: string, dir: string) {
    const directory = `${path}/${dir}`;
    // try {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    return directory;
    // } catch (e: any) {
    //     // Directory exist
    //     console.log(
    //         `Could not create the directory ${directory} - `,
    //         e?.message
    //     );
    // }
}

export async function getWorkingDir(): Promise<string> {
    // try {
    const dir = await createDirectory(projPath, workingDirName);
    return dir;
    // } catch (e: any) {
    //     console.log(e.message);
    //     // return defaultWorkingDir;
    // }
}

export async function getDocumentsDir(): Promise<string> {
    // try {
    const dir = await createDirectory(projPath, documentsDirName);
    return dir;
    // } catch (e: any) {
    //     console.log(e.message);
    //     // return defaultDocumentsDir;
    // }
}
