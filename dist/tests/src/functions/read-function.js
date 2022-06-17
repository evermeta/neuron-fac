"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const read_function_1 = require("../../../src/functions/read-function");
describe("readFunction function", () => {
    it("Creates an executable function from a function definition (an object of type OjbFunction)", () => {
        const coorgTest = {
            funcBody: "a.ar === b.ar",
            returnType: "boolean",
        };
        const testFuncOne = (0, read_function_1.readFunction)(coorgTest);
        (0, chai_1.expect)(testFuncOne({ ar: "fdsa" }, { ar: "fdsa" })).to.equal(true);
        (0, chai_1.expect)(testFuncOne({ ar: "fdscla" }, { ar: "fdsa" })).to.equal(false);
        (0, chai_1.expect)(testFuncOne({ ard: "fdscla" }, { ar: "fdsa" })).to.equal(false);
    });
});
