/******************************************************************************/

import fs from 'fs';
import path from 'path';
/******************************************************************************/

import { Folder, JSONObject } from "./types";
import { writeToFile, writeToFileAsJson } from './write';
/******************************************************************************/

type Content = JSONObject | string;
/******************************************************************************/

export const newFolder = async (folderPath: string): Promise<Folder> => {
    if(fs.existsSync(folderPath)) {
        fs.rmdirSync(folderPath, { recursive: true });
    }
    return new Promise((resolve) => {
        fs.mkdir(folderPath, () => {
                resolve({
                    path: folderPath,
                    write: (fileName: string, content: Content) => {
                        const filePath = path.join(folderPath, fileName);
                        return typeof content === 'string' 
                            ? writeToFile(filePath, content)
                            : writeToFileAsJson(filePath, content);
                    }
                });
            });
    }); 
};
