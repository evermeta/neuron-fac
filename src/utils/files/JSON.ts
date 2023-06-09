/******************************************************************************/
import fs from "fs";
import { JSONObject } from "./types";
/******************************************************************************/

export const readJSONObjectFromFile = (filePath: string): Promise<JSONObject> => {
    let strData: string;
    const p = new Promise((resolve, reject) => {
        fs.readFile(filePath, "utf8", (err, data) => {
            if (err) {
                return reject("Unable to read file");
            }
            strData = data;
            return resolve(1);
        });
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return p.then((_) => JSON.parse(strData) as JSONObject);
};

export const writeJSONObjectFromFile = (
    filePath: string,
    obj: JSONObject
): Promise<void> => {
    const p = new Promise((resolve) => {
        fs.writeFile(filePath, JSON.stringify(obj), () => {
            return resolve(1);
        });
    });

    return p.then((_) => {
        return;
    });
};
