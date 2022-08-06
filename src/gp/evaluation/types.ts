import { Percentage } from "../../utils/math/proportions/types";
import { Program } from "../programs/program-class";

export type TestScore = number;

export type TestFunction = (p: Program) => Percentage;

export type TestSuiteType = {
    tests: TestFunction[];
    evaluateProgram: (p: Program) => TestScore;
};

export class TestSuite implements TestSuiteType {
    public tests: TestFunction[];

    constructor(tests: TestFunction[] = []) {
        this.tests = tests;
    }
    evaluateProgram(p: Program): TestScore {
        let score = 0;
        this.tests.forEach((t) => {
            score += t(p).value;
        });
        return score / this.tests.length;
    }
}
