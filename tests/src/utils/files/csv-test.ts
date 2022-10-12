/******************************************************************************/

import { expect } from "chai";
import { readCSV } from "../../../../src/utils/files";
import { Matrix } from "../../../../src/utils/math/algebra/matrix";
/******************************************************************************/

describe("The readCSV function", () => {
    it("Reads a csv file into a matrix", () => {
        const filePath = "tests/src/utils/files/test.csv"; 
        return readCSV(filePath).then((lines) => {
            expect(lines).to.be.an.instanceOf(Matrix);
            expect(lines.values).to.deep.equal([
                [1,2,3],
                [4,5,6],
                [7,8,9]
            ]);
        });
    });


});
