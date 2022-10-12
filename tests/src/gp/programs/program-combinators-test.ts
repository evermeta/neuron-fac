import { expect } from "chai";
import { jsCompiler } from "../../../../src/gp/programs/compilers";
import { ProgramArguments } from "../../../../src/gp/programs/program-arguments/types";
import { Program } from "../../../../src/gp/programs/program-class";
import { partialApplication } from "../../../../src/gp/programs/program-combinators/combinators";
import { readCSVFromFile } from "../../../../src/utils/files/csv";

const newJSOneLinerProgram = (programArguments: ProgramArguments, code: string) => new Program(
    "jsOneLiner",
    programArguments, 
    "number",
    code,
);

const programAdd = newJSOneLinerProgram( { 
    a: { type: "number", index: 0 },
    b: { type: "number", index: 1 } 
}, "a+b");

const programTwo = newJSOneLinerProgram( { 
    a: { type: "number", index: 0 },
    b: { type: "number", index: 1 },
    c: { type: "number", index: 2 } 
}, "b*a+c");

describe("Program combinators - partialApplication combinator", () => {
    it(`It creates a new program from an existing program and its partial 
    application to a list of arguments,  referred to as 'super-curry' 
    from now on`, async () => {
        const partial = partialApplication(programAdd, {b: 2});
        expect(jsCompiler(partial)([5])).to.deep.equal(7);
    });

    it("It can super-curry in any order", async () => {
        const partial = partialApplication(programAdd, {a: 2});
        expect(jsCompiler(partial)([5])).to.deep.equal(7);
    });

    it("It can super-curry multiple variables in any order", async () => {
        const partial = partialApplication(programTwo, {c: 4, a: 2});
        expect(jsCompiler(partial)([5])).to.deep.equal(14);
    });



});
