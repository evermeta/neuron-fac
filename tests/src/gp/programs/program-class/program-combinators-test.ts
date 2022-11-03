import { expect } from "chai";
import { jsCompiler } from "../../../../../src/gp/programs/compilers/jsCompiler";
import { Program } from "../../../../../src/gp/programs/program-class";
import { partialApplication } from "../../../../../src/gp/programs/program-combinators/combinators";
import { newJSOneLinerProgram } from "../program-arguments/utils";


const programAdd = newJSOneLinerProgram( { 
    a: { type: "Number", index: 0 },
    b: { type: "Number", index: 1 } 
}, "a+b");

const programTwo = newJSOneLinerProgram( { 
    a:      { type: "Number", index: 0 },
    mult:   { type: "Number", index: 1 },
    c:      { type: "Number", index: 2 } 
}, "mult*a+c");


describe("Program combinators - partialApplication combinator", () => {

    it(`It creates a new program from an existing program and its partial 
    application to a list of arguments,  referred to as 'super-curry' 
    from now on`, async () => {
        const partial = partialApplication(programAdd, {b: 2}) as Program;
        const executableProcess = jsCompiler(partial);
        expect(executableProcess([4])).to.deep.equal(6);
    });


    it("It can super-curry in any order", async () => {
        const partial = partialApplication(programAdd, {a: 2}) as Program;
        expect(jsCompiler(partial)([5])).to.deep.equal(7);
    });


    it("It can super-curry multiple variables in any order", async () => {
        const partial = partialApplication(programTwo, {c: 4, mult: 2}) as Program;
        expect(jsCompiler(partial)([5])).to.deep.equal(14);
    });

    it("It can super-curry multiple variables in any order", async () => {
        const programArguments = {
            TypeVariable: 'T', 
            c: { type: "T", index: 1 },
            b: { type: "T", index: 0 },
        };

        const program = new Program("jsOneLiner", programArguments, "T", "b"); 
        const partial = partialApplication(program, {T: 'Number'}) as Program;
        expect(jsCompiler(partial)([5,4])).to.deep.equal(5);
    });

});
