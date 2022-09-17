import { expect } from "chai";
import { getSignature } from "../../../../../src/gp/programs/program-arguments/get-signature";
import { Program } from "../../../../../src/gp/programs/program-class";

describe("Program typeSignature property", () => {
    it("It returns the type signature of the program", () => {

        const testSignature =  getSignature(
            { b: { type: "number", index: 0 }},
            'Whatever'); 

        expect(testSignature).to.deep.equal("number => Whatever");
    });

    it("It returns the type signature of the program", () => {
        const progArgs = {
            d: { type: "string", index: 1 },
            b: { type: "number", index: 0 },
        };
        const program = new Program(
            "jsOneLiner", 
            progArgs, 
            'number', 
            "b*3");
        expect(program.typeSignature).to.deep.equal(
            "number => string => number"
        );
    });
});
