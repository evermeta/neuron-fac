/******************************************************************************/

import fs from "fs";
import { Matrix } from "../math/algebra/matrix";
/******************************************************************************/

export const readCSVFromFile = (filePath: string): Promise<Matrix> => {
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
    return p.then((_) => new Matrix({values: strData
        .split(/[\t\r]*\n[\r\t]*/)
        .map((line: string) => 
            line.split(/[\t\r]*,[\r\t]*/)
                .map(x=>+x))}));
};