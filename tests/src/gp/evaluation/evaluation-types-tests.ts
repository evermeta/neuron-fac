/* eslint-disable @typescript-eslint/no-unused-vars */
/*******************************************************************************
 * 
 * 
 * ****************************************************************************/

import { expect } from "chai";
import { TestSuite } from "../../../../src/gp/evaluation/types";
import { Program } from "../../../../src/gp/programs/program-class";
import { Percentage } from "../../../../src/utils/math/proportions/types";
/******************************************************************************/
const filePath = __dirname + "/evaluation-types-tests.ts";
describe (`${filePath}::TestFunction type`, () => { 
    it("is a function that takes a Program and returns a Percentage", () => {
        const testFunction = (p: Program) => new Percentage(100);
        expect(testFunction).to.be.a("function");
        expect(testFunction.length).to.eq(1);
        expect(testFunction(new Program("js", {}, "Number", {unprocessedCode: "return 3;"}))).to.be.an.instanceOf(Percentage);
    });
});

describe(`${filePath}::TestSuite class`, () => {

    it("is constructed with an array of objects of type TestFunction", () => {
        const testFunction1 = (p: Program) => new Percentage(100);
        const testFunction2 = (p: Program) => new Percentage(100);
        const testSuite = new TestSuite([
            testFunction1,
            testFunction2
        ]);
        expect(testSuite.tests.length).to.eq(2);
    });

    it("It evaluates a program", () => {

        const compiler = (code: string, language: string) => {
            if (language === "js") {
                return (context: unknown) => {
                    const func = new Function("a", code);
                    return func(context);
                };
            }
            throw "error";
        };

        const program = new Program(
            "js", {}, 
            "Number",
            {
                unprocessedCode: "return 3;"
            });

        const execProcess = compiler(program.code.unprocessedCode, program.language);
        const testSuite = new TestSuite([
            (p: Program) => (execProcess([]) as number) < 4 ? new Percentage(0) : new Percentage(100),
            (p: Program) => (execProcess([]) as number) % 2 === 1 ? new Percentage(100) : new Percentage(0)
        ]);
        const score = testSuite.evaluateProgram(program);
        expect(score).to.eq(50);
    });
});
