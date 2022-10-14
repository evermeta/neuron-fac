import { expect } from "chai";
import { jsCompiler } from "../../../../src/gp/programs/compilers/jsCompiler";
import { ProgramArguments } from "../../../../src/gp/programs/program-arguments/types";
import { Program } from "../../../../src/gp/programs/program-class";


const newJSOneLinerProgram = (programArguments: ProgramArguments, code: string) => new Program(
    "jsOneLiner",
    programArguments, 
    "number",
    code,
);
describe("Compilers", () => {

    it("It has a unique 36 char uuid", () => {

        const programTwo = newJSOneLinerProgram( { 
            a: { type: "number", index: 0 },
            b: { type: "number", index: 1 } 
        }, "b*a");

        const executableProcessTwo = jsCompiler(programTwo);
        expect(executableProcessTwo([2,5])).to.deep.equal(10);
    });
}); 