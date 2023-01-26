import { expect } from "chai";
import { ProgramArguments } from "../../../../../src/gp/programs/program-arguments/program-arguments";
import { typeSignatureFromProgramArguments } from "../../../../../src/gp/programs/program-arguments/type-signature-class";
import { Program } from "../../../../../src/gp/programs/program-class";
/******************************************************************************/

const newJSOneLinerProgram = (
    progArgs: ProgramArguments, 
    code: string 
    ) => 
    new Program( "jsOneliner", progArgs, "number", code)

/******************************************************************************/
describe("Program typeSignature property", () => {
    it("It returns the type signature of the program", () => {

        const progArgs = { b: { type: "number", index: 0 }}; 
        const testSignature =  typeSignatureFromProgramArguments(progArgs, 'Whatever');
        expect(testSignature).to.deep.equal("(number) => Whatever");
    });

    it("It returns the type signature of the program", () => {
        const progArgs = {
            d: { type: "string", index: 1 },
            b: { type: "number", index: 0 },
        };
        const program = newJSOneLinerProgram(progArgs, "b*3");
        expect(program.typeSignature.expression).to.deep.equal(
            "(number) => (string) => number"
        );
    });
});



