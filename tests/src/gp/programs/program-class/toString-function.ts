import { expect } from "chai";
import { oneLinerCodePreprocessor } from "../../../../../src/gp/programs/compilers";
import { Program } from "../../../../../src/gp/programs/program-class";

describe("Program::toString()", () => {
    it("It returns the code of the program in a human readable version, One", () => {
        const program = new Program(
            "jsOneLiner",
            { b: { type: "number", index: 0 } },
            "number",
            "b*3"
        );

        expect(program.toString()).to.deep.equal([
            "//Type Signature: number => number",
            "//Program Language: jsOneLiner",
            "//UnprocessedCode: b*3"
        ].join("\n"));
    });


    it("It returns the code of the program in a human readable version, Two", () => {

        const program = new Program(
            "jsOneLiner",
            {   c: { type: "number", index: 0 }, 
                b: { type: "number", index: 1 } 
            },   
            'number',
            {
                unprocessedCode: "b*c",
                preProcessor: oneLinerCodePreprocessor,
            }
        );

        expect(program.toString()).to.deep.equal([
            "//Type Signature: number => number => number",
            "//Program Language: jsOneLiner",
            `const ${program.ID} = (a) => {\n\tconst c=_c_b[0];\n\tconst b=_c_b[1];\n\treturn b*c;\n}`,
        ].join("\n"));
    }); 


});