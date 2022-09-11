import {expect} from "chai";
import { areOrthogonalVectors, dotProduct } from "../../../../../src/utils/math/algebra/vectors";

const newVector = (values: number[]) => ({values});

describe("The vector numeric type", () => {

    it("Has a dot product operation", () => {
        const v1 = newVector([1, 2, 3]); 
        const v2 = newVector([4, 5, 6]);
        expect(dotProduct(v1, v2)).to.equal(32);
    });

    it("The vectors need have the same length for the operation to be valid", () => {
        const v1 = newVector([1,3,2,3]); 
        const v2 = newVector([1,2,3]); 
        expect(() => dotProduct(v1, v2)).to.throw("Vectors must have the same length");
    });

});

describe("The areOrthogonalVectors function", () => {
    
        it("Returns true for orthogonal vectors", () => {
            const v1 = newVector([1,0,0]); 
            const v2 = newVector([0,1,0]);
            expect(areOrthogonalVectors([v1, v2])).to.be.true;
        });

        it("Returns true for orthogonal vectors", () => {
            const v1 = newVector([1,0,-1]); 
            const v2 = newVector([1,Math.sqrt(2),1]);
            const v3 = newVector([1,-Math.sqrt(2),1]);
            expect(areOrthogonalVectors([v1, v2, v3])).to.be.true;
        });

        it("The vectors need have the all be of the same length for the predicate to be valid", () => {
            const v1 = newVector([1,3,2,3]); 
            const v2 = newVector([1,2,3]); 
            const v3 = newVector([1,2,3,4]);
            expect(() => areOrthogonalVectors([v1, v2, v3])).to.throw("Vectors must have the same length");
        });

    });

