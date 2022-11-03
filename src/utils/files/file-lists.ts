/* eslint-disable @typescript-eslint/no-unused-vars */
import { IFile } from "./types";

export const deepFileList = async <T>(
    fileAPI: IFile<string>, 
    folder: T, 
    toPath: (f: T) => string): Promise<string[]> => {
        const _deepFileList = async (
            folderPath: string, 
            fileList: string[] = [],
            root?: string
        ): Promise<void> => {
            const files = await fileAPI.listing(folderPath);
            const fromRoot = (f: string) => root ? fileAPI.absolutePath(root, f) : f;
            await Promise.all(
                files.map((f) => {
                    const path = fileAPI.absolutePath(folderPath, f);
                    if (fileAPI.isDirectory(path)) {
                        return _deepFileList(path, fileList, fromRoot(f));
                    }
                    fileList.push(fromRoot(f));
            }))};
        const result: string[] = [];
        await _deepFileList(toPath(folder), result);
        return result;
    };