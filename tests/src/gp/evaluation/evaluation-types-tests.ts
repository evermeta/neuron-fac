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

describe("TestSuite class", () => {
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
