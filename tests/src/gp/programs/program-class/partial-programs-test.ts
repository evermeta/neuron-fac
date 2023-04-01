import { expect } from "chai";
import { jsCompiler } from "../../../../../src/gp/programs/compilers/jsCompiler";
import { Program } from "../../../../../src/gp/programs/program-class";
import { partialApplication } from "../../../../../src/gp/programs/program-combinators/combinators";

 const programArguments = {
            TypeVariable: 'T', 
                c: { type: "T", index: 1 },
                b: { type: "T", index: 0 },
        };

const program = new Program(
        "jsOneLiner", 
        programArguments, 
        "T",
        "b"); 

const executableProgram = jsCompiler(program);

describe("Program class constructor - Type abstracted programs", () => {

    it("Some or all of the program's arguments can be type variables", () => {
        expect(program.typeSignature.expression).to.deep.equal("< T > . T => T => T");
        expect(executableProgram([1, 0])).to.deep.equal(1);
        expect(executableProgram([true, false])).to.deep.equal(true);

        const partial = partialApplication(program, {T: "Number"}) as Program;
        expect(partial.typeSignature.expression).to.deep.equal("Number => Number => Number");
    
    });
}); 