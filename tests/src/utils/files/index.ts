/******************************************************************************/
import * as FileUtils from "../../../../src/utils/files/index";
import {expect} from "chai";

/******************************************************************************/
describe("The readCSV function", () => {
    it("Reads a csv file", () => {
        const filePath = "tests/src/utils/files/test.csv"; 
        return FileUtils.readCSV(filePath).then((lines) => {
            expect(lines.values).to.deep.equal([
                [1,2,3],
                [4,5,6],
                [7,8,9]
            ]);
        });
    });
});

/******************************************************************************/
describe("The readJSON function", () => {
    it("Reads a json file", () => {
        const filePath = "tests/src/utils/files/test.json"; 
        return FileUtils.readJSON(filePath).then((obj) => {
            expect(obj).to.deep.equal({
                a: 1,
                b: 2,
                c: 3
            });
        });
    });
});
