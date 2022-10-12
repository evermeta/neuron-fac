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


describe("GP process", () => {
    it("It reads a dataSet of results in a matrix", async () => {
        const lr = await readCSVFromFile("tests/datasets/square.csv");
        expect(lr.values[0]).to.deep.equal([-3, 9]);
    });



});









