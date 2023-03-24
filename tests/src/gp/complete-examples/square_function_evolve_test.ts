import { expect } from "chai";
import { Program } from "../../../../src/gp/programs/program-class";
import { ProgramArguments } from "../../../../src/gp/types";
import { readCSVFromFile } from "../../../../src/utils/files/csv";



let dataPoints: number[][] = [];
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

const thisFilePath = "tests/src/gp/complete-examples/square_function_evolve_test.ts";

describe(`${thisFilePath}::readCSVFromFile function`, () => {

    it("reads a dataSet of results in csv format into a matrix", async () => {
        const lr = await readCSVFromFile("tests/datasets/square.csv");
        expect(lr.values[0]).to.deep.equal([-3, 9]);
    });


});










