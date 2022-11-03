import { expect } from "chai";
import { Program } from "../../../../src/gp/programs/program-class";
import { ProgramArguments } from "../../../../src/gp/types";
import { readCSVFromFile } from "../../../../src/utils/files/csv";

const newJSOneLinerProgram = (programArguments: ProgramArguments, code: string) => new Program(
    "jsOneLiner",
    programArguments, 
    "Number",
    code,
);


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const programAdd = newJSOneLinerProgram( { 
    a: { type: "Number", index: 0 },
    b: { type: "Number", index: 1 } 
}, "a+b");


describe("GP process", () => {
    it("It reads a dataSet of results in a matrix", async () => {
        const lr = await readCSVFromFile("tests/datasets/square.csv");
        expect(lr.values[0]).to.deep.equal([-3, 9]);
    });



});










