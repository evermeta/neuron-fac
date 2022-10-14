import { expect } from "chai";
import { ProgramArguments } from "../../../../../src/gp/programs/program-arguments/types";
import { Program } from "../../../../../src/gp/programs/program-class";
import { partialApplication } from "../../../../../src/gp/programs/program-combinators/combinators";

const testArgumentsOne = { 
    c_1: { type: "number", index: 0 }, 
    c_2: { type: "number", index: 1 }, 
    theta: { type: "number", index: 2 } 
};


const newOneLineProgram = (code: string) => (progArguments:ProgramArguments) => new Program(
    "jsOneLiner",
    progArguments,
    "number",
    code
);

describe("Program::toString()", () => {
    it("It returns the code of the program in a human readable version, One", () => {

        const program = newOneLineProgram("b*3") ({ b: { type: "number", index: 0 }});
        const programAsString = program.toString();
        expect(programAsString).to.deep.equal([
            "//Type Signature: number => number",
            "b:number",
            "b*3"
        ]); 
    });

    it("It returns the code of the program in a human readable version, Two", () => {

        const program = newOneLineProgram("b*c")(
            {   c: { type: "number", index: 0 }, 
                b: { type: "number", index: 1 } 
            });
        const programAsString = program.toString();
        expect(programAsString).to.deep.equal([
            "//Type Signature: number => number => number",
            "c:number,b:number",
            `b*c`,
        ]);
    }); 

    it("It returns the code of the program in a human readable version, Three", () => {
        const functionAsString = "theta*(c_1 - c_2)";
        const p1 = new Program(
            "jsOneLiner",
            testArgumentsOne,
            'number',
            {
                unprocessedCode: functionAsString, 
            }
        );

        const programAsString = (partialApplication(p1,{theta: 3})).toString();

        expect(programAsString).to.deep.equal([
            "//Type Signature: number => number => number",
            "c_1:number,c_2:number",
            `(theta => ${functionAsString})(3)`,
        ]);
    }); 
});