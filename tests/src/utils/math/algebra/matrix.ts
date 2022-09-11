import {expect} from "chai";
import { Matrix, trace, transpose } from "../../../../../src/utils/math/algebra/matrix";

describe("The matrix function", () => {

    it("Can be constructed through an array of arrays", () => {
        const m1 = new Matrix({
            values: [[1,2,3],[4,5,6],[7,8,9]]
        });

        expect(trace(m1)).to.equal(15);
        const mT = transpose(m1)
        expect(mT).to.deep.equal(
            new Matrix({
                values: [[1,4,7],[2,5,8],[3,6,9]]
            }));
        expect(trace(mT)).to.equal(15);
    }); 

    it("Can be constructed through a number of rows and columns", () => {
        const m2 = new Matrix({
            rows: 3,
            columns: 3
        });

        expect(trace(m2)).to.equal(0);
    });
}); 

