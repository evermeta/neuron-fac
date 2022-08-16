import { expect } from "chai";
import { readFunction } from "../../../../src/gp/functions/read-function";
import { JSProgramAsJson } from "../../../../src/gp/functions/types";

const shallowEq = (arr1: number[], arr2: number[]): boolean => {
    const a = arr1.some((x) => arr2.includes(x) === false);
    if (a === true) return false;
    const b = arr2.some((x) => arr1.includes(x) === false);
    return !b;
};

describe("readFunction function", () => {

    it("should return a function", () => {
        const result = readFunction({
            var: "x",
            funcBody: "x",
            returnType: "number",
        });
        expect(result).to.be.a("function");
    }); 

    it("Builds an executable js function from a json definition", () => {
        const double: JSProgramAsJson = {
            var: "a",
            funcBody: "2 * a",
            returnType: "number",
        };
        const doubleFunc = readFunction(double);
        expect(doubleFunc(3)).to.equal(6);
    });

    it("The function it builds could return a boolean", () => {
        
        const isEven = readFunction({
            var: "a",
            funcBody: "a%2 === 0",
            returnType: "boolean",
        });

        const test = [8, 3, 1, 5, 2, 1, 4, 3]
            .map((x) => (isEven(x) ? x : -1))
            .filter((x) => x !== -1);
        expect(shallowEq(test, [8, 2, 4])).to.eq(true);
    });

    it("The function it builds could return a string", () => {
        const numberToString: JSProgramAsJson = {
            var: "a",
            funcBody: "a.toString()",
            returnType: "string",
        };
        const numberToStringFunc = readFunction(numberToString);
        expect(numberToStringFunc(3)).to.equal("3");
    });

});
