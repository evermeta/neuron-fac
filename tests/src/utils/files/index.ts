/******************************************************************************/
import * as FileUtils from "../../../../src/utils/files/index";
import {expect} from "chai";

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
