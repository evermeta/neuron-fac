/*****************************************************************************/

import { expect } from "chai";
import { TypeSignature, typeSignatureFromProgramArguments } from "../../../../../src/gp/programs/program-arguments/type-signature-class";
import { ProgramArguments } from "../../../../../src/gp/programs/program-arguments/program-arguments";
import { Program } from "../../../../../src/gp/programs/program-class";
import { arrowTypeSignature } from "../../../../../src/gp/programs/program-arguments/type-signature-combinators";
/*****************************************************************************/

const newJSOneLinerProgram = (progArgs: ProgramArguments, code: string) => {
    return new Program(
        "jsOneliner",
        progArgs,
        "number",
        code);
};
/*****************************************************************************/

describe("The TypeSignature class", () => {
    
    it("Can be constructed from a string: One", () => {
        const typeSignature = new TypeSignature("string => number");
        expect(typeSignature.expression).to.equal("string => number");
    });

    it("Can be constructed from a string: Two", () => {
        const typeSignature = new TypeSignature("<X>.(string => X) => X => X");
        expect(typeSignature.expression).to.equal("<X>.(string => X) => X => X");
    });
    
    it("can be constructed from a ProgramArguments object: One", () => {
        const progArgs: ProgramArguments = {
            arg0: { index: 0, type: "string" },
            arg1: { index: 1, type: "number" }
        };
        const typeSignature = new TypeSignature({
            outputType: "number",
            inputs: progArgs
        });
        expect(typeSignature.expression).to.equal("(string) => (number) => number");
    });

    it("It returns the type signature of the program", () => {

        const testSignature =  new TypeSignature(
                typeSignatureFromProgramArguments(
                    { b: { type: "number", index: 0 }},
                    'Whatever')
            );

        expect(testSignature.expression).to.deep.equal("(number) => Whatever");
    });

    it("It returns the type signature of the program", () => {
        const progArgs = { d: { type: "string", index: 1 }, b: { type: "number", index: 0 } };
        const program = newJSOneLinerProgram(progArgs, "b*3");
        expect(program.typeSignature.expression).to.deep.equal(
            "(number) => (string) => number"
        );
    });
});


describe("The TypeSignature class, with regards to type abstractions", () => {

    it( [   "A TypeSignature object can be constructed from ", 
            "a ProgramArguments object ",
            "that specifies one type variable"].join(''), () => {

        const progArgs: ProgramArguments = {
           "TypeVariable": "X",
           "arg1": { index: 0, type: "number => X"},
            "arg2": {index: 2, type: "X" }
        }; 
        const typeSignature = new TypeSignature({
            outputType: "X",
            inputs: progArgs
        });
        expect(typeSignature.expression).to.equal("<X>.(number => X) => (X) => X");
    });
});

describe("The typeArrow combinator", ()=>{
    it("Can be used to construct a type signature", ()=>{
        const typeSignature = arrowTypeSignature("number", "string");
        expect(typeSignature.expression).to.equal("number => string");
    });

    it("Can be used to construct a type signature", ()=>{
        const typeSignature = arrowTypeSignature("number => number", "string");
        expect(typeSignature.expression).to.equal("(number => number) => string");
    });

})