/*****************************************************************************/
import {expect} from "chai";
import { Matrix, minorMatrix } from "../../../../../src/utils/math/algebra/matrix";
import { matrixProduct, trace, transpose } from "../../../../../src/utils/math/algebra/matrix-operations";
/*****************************************************************************/

describe("The Matrix class", () => {

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
/******************************************************************************/

describe("The minor method of the Matrix class", () => {
    it("Returns the determinant of a 2x2 matrix", () => {
        const m1 = new Matrix({
            values: [
                [1,2,3],
                [4,5,6],
                [7,8,9]
            ]});

        expect(m1.minor(0,0)).to.equal(-3);
        expect(m1.minor(0,1)).to.equal(-6);
        expect(m1.minor(1,0)).to.equal(-6);
        expect(m1.minor(1,1)).to.equal(-12);
    });
});
/******************************************************************************/

describe("The matrix product function", () => {

    it("Calculates the value of the product of two matrices", () => {
        const matrix = matrixProduct(
            new Matrix({ values: [[1,2,3],[4,5,6],[7,8,9]] }),
            new Matrix({ values: [[1,2,3],[4,5,6],[7,8,9]] })); 

        expect(matrix).to.deep.equal(
            new Matrix({ values: [[30,36,42],[66,81,96],[102,126,150]] }));
        });
});

describe("The minor matrix function", () => {
    
        it("Calculates the minor matrix of a matrix", () => {
            const matrix = new Matrix({ values: [
                [1,2,3],
                [4,5,6],
                [7,8,9]] });

            const minor = new Matrix({values: minorMatrix(matrix.values, 0,0)});
    
            expect(minor).to.deep.equal(
                new Matrix({ 
                    values: [ 
                        [5,6], 
                        [8,9]]})); 
    });
});


