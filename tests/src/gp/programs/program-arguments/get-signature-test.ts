import { expect } from "chai";
import { TypeSignature, typeSignatureFromProgramArguments } from "../../../../../src/gp/programs/program-arguments/type-signature-class";
import { newJSOneLinerProgram } from "./utils";
/******************************************************************************/

describe("The TypeSignature class", () => {

    it("It can be constructed from a string", () => {
        const testSignature =  new TypeSignature('(A) => (A => X) => X');
        expect(testSignature.expression).to.deep.equal("A => ( A => X ) => X");
    });

 
    it("It returns the type signature of the program", () => {

        const progArgs = { b: { type: "Number", index: 0 }}; 
        const testSignature =  typeSignatureFromProgramArguments(progArgs, 'Whatever');
        expect(testSignature).to.deep.equal("(Number) => Whatever");
    });

    it("It returns the type signature of the program", () => {
        const progArgs = {
            d: { type: "String", index: 1 },
            b: { type: "Number", index: 0 },
        };
        const program = newJSOneLinerProgram(progArgs, "b*3");
        expect(program.typeSignature.expression).to.deep.equal(
            "Number => String => Number"
        );
    });
});



