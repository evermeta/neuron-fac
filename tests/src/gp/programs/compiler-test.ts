/******************************************************************************/

import { expect } from "chai";
import { jsCompiler } from "../../../../src/gp/programs/compilers/jsCompiler";
import { newJSOneLinerProgram } from "./program-arguments/utils";
/******************************************************************************/

describe("Compilers", () => {

    it("It has a unique 36 char uuid", () => {

        const programTwo = newJSOneLinerProgram( { 
            a: { type: "Number", index: 0 },
            b: { type: "Number", index: 1 } 
        }, "b*a");

        const executableProcessTwo = jsCompiler(programTwo);
        expect(executableProcessTwo([2,5])).to.deep.equal(10);
    });
}); 