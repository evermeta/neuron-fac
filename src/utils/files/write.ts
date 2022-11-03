
/******************************************************************************/

import fsPromises from 'fs/promises';
import { JSONObject } from './types';
/******************************************************************************/

export const writeToFile = (filePath: string, content: string): Promise<void> => 
    fsPromises.writeFile(filePath, content);

export const writeToFileAsJson = (filePath: string, content: JSONObject): Promise<void> =>{
    const _content = JSON.stringify(content);
    return writeToFile(filePath, _content);
}


