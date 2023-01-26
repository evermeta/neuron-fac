import { expect } from "chai";
import { binaryEncloserSplit, encloserSplit } from "../../../../src/utils/strings/parenthesis";

describe("binary encloser split function", () => {
    it("Returns the input string when it doesn't contain parenthesis", () => {
        const result = binaryEncloserSplit("no parenthesis here");
        expect(result).to.deep.equal(["no parenthesis here"]);
    });
    it("returns an array with the contents of the parenthesis", () => {
        const result = binaryEncloserSplit("this (has) (parenthesis)");
        expect(result).to.deep.equal(["this", "has", "parenthesis"]);
    });
    it("The return array contains only first level parenthesis expressions", () => {
        const result = binaryEncloserSplit("this (has) (parenthesis (with) (nested) parenthesis)");
        expect(result).to.deep.equal(["this", "has", "parenthesis (with) (nested) parenthesis"]);
    });

    it("It ignores trailing spaces in each sub-block", () => {
        const result = binaryEncloserSplit("( this sentence (has)) (two blocks, (each) with (nested) parenthesis)");
        expect(result).to.deep.equal(["this sentence (has)", "two blocks, (each) with (nested) parenthesis"]);
    });

    it("", () => {
        const resultOne = encloserSplit(
            "(A => B)=>(A => X) => X"
        );
        expect(resultOne).to.deep.equal(["A => B", "=>", "A => X", "=> X"]);

        const resultTwo = encloserSplit("(A => B)=>((A => X) => X)");
        expect(resultTwo).to.deep.equal(["A => B", "=>", "(A => X) => X"]);
    });
});
