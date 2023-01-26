import { expect } from "chai";
import { jsCompiler } from "../../../../../src/gp/programs/compilers/jsCompiler";
import { Program } from "../../../../../src/gp/programs/program-class";
import { partialApplication } from "../../../../../src/gp/programs/program-combinators/combinators";


describe("Program class constructor - Type abstracted programs", () => {

    it("Some of the program arguments can be type variables", () => {
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

    expect(program.typeSignature.expression).to.deep.equal("<T>.(T) => (T) => T");
    const executableProgram = jsCompiler(program);
    expect(executableProgram([1, 0])).to.deep.equal(1);
    expect(executableProgram([true, false])).to.deep.equal(true);

    const partial = partialApplication(program, {T: "number"}) as Program;
    expect(partial.typeSignature.expression).to.deep.equal("(number) => (number) => number");
    
    });
}); 