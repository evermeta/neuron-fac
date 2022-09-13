/******************************************************************************/
import {expect} from "chai";
import * as Vectors from "../../../../../src/utils/math/algebra/vectors";

const newVector = (values: number[]) => ({values});
/******************************************************************************/

describe("The vector numeric type", () => {

    it("Has a dot product operation", () => {
        const v1 = newVector([1, 2, 3]); 
        const v2 = newVector([4, 5, 6]);
        expect(Vectors.dotProduct(v1, v2)).to.equal(32);
    });

    it("The vectors need have the same length for the operation to be valid", () => {
        const v1 = newVector([1,3,2,3]); 
        const v2 = newVector([1,2,3]); 
        expect(() => Vectors.dotProduct(v1, v2)).to.throw("Vectors must have the same length");
    });

});


describe(`The 'orthogonalVectors' function`, () => {
    
        it(["It returns true when provided an array of orthogonal",
            "vectors as input, but false otherwise"].join(' '), () => {
            const v1 = newVector([1,0,0]); 
            const v2 = newVector([0,1,0]);
            expect(Vectors.orthogonalVectors([v1, v2])).to.be.true;
        });

        it("test 1", () => {
            const v1 = newVector([1,0,-1]); 
            const v2 = newVector([1,Math.sqrt(2),1]);
            const v3 = newVector([1,-Math.sqrt(2),1]);
            expect(Vectors.orthogonalVectors([v1, v2, v3])).to.be.true;
        });

        it("Test 2", () => {
            const v1 = newVector([  3, 0 ,4]); 
            const v2 = newVector([ -4, 0 ,3]);
            const v3 = newVector([  0, 9 ,0]);
            expect(Vectors.orthogonalVectors([v1, v2, v3])).to.be.true;
        });

        it("Test 2", () => {
            const v1 = newVector([  3, 1 ,4]); 
            const v2 = newVector([ -4, 0 ,3]);
            const v3 = newVector([  3, 9 ,0]);
            expect(Vectors.orthogonalVectors([v1, v2, v3])).to.be.false;
        });
 
        it("The vectors must have be of the same length", () => {
            const v1 = newVector([1,3,2,3]); 
            const v2 = newVector([1,2,3]); 
            const v3 = newVector([1,2,3,4]);
            expect(() => Vectors.orthogonalVectors([v1, v2, v3])).to.throw("Vectors must have the same length");
        });


    });

