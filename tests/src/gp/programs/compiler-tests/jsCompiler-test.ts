import { expect } from "chai";
import { oneLinerCodePreprocessor, programSectionDivider } from "../../../../../src/gp/programs/compilers/jsCompiler";
/******************************************************************************/

describe("The oneLinerCode Preprocessor", () => {

    it("It can be constructed from a string", () => {
        const x = oneLinerCodePreprocessor(
            { a: { type: "Number", index: 0 } },
            "a",
            "x"
        );
        expect(x).to.deep.equal([
            "/** Program Inputs **/",
            "const a=x[0];",
            "if(typeof a !== 'number') throw new Error('Type Error: Expected a number');",
            programSectionDivider,
            "return a;",
        ]);
    });
});
