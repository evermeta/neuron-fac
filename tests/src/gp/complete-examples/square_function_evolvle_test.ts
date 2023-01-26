import { expect } from "chai";
import { ProgramArguments } from "../../../../src/gp/programs/program-arguments/program-arguments";
import { Program } from "../../../../src/gp/programs/program-class";
import { readCSVFromFile } from "../../../../src/utils/files/csv";

const newJSOneLinerProgram = (programArguments: ProgramArguments, code: string) => new Program(
    "jsOneLiner",
    programArguments, 
    "number",
    code,
);


// eslint-disable-next-line @typescript-eslint/no-unused-vars
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










