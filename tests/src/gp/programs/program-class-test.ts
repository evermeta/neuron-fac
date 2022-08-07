import { expect } from "chai";
import { Program } from "../../../../src/gp/programs/program-class";
import { jsCompiler, oneLinerCodePreprocessor } from "../../../../src/gp/programs/compilers";

describe("Program class", () => {
    it("A program has a unique uuid", () => {
        const program = new Program("js", { a: { index: 0, type: "number" } }, "");
        expect(program.ID).to.be.a("string");
        expect(program.ID.length).to.be.eq(36);
    });

    it("It represents a program", () => {
        const program = new Program(
            "jsOneLiner",
            { b: { type: "number", index: 0 } },
            "b*3"
        );
        const execProcess = jsCompiler(program);
        expect(execProcess([3])).to.deep.equal(9);
    });

    it("It represents a program", () => {
        const program = new Program(
            "jsOneLiner",
            { b: { type: "string", index: 0 } },
            "b.toString().length"
        );
        const execProcess = jsCompiler(program);
        expect(execProcess(["baba"])).to.deep.equal(4);
    });

    it("The program can accept several arguments", () => {
        const programArguments = {
            b: { type: "string", index: 0 },
            c: { type: "number", index: 1 },
        };
        const code = "b.toString().length * c";

        const program = new Program("jsOneLiner", programArguments, code);
        const execProcess = jsCompiler(program);
        expect(execProcess(["bcba", 3])).to.deep.equal(12);
    });

    it("In any order", () => {
        const programArguments = {
            d: { type: "number", index: 2 },
            c: { type: "number", index: 1 },
            b: { type: "string", index: 0 },
        };
        const code = "b.toString().length * c + d";
        const program = new Program("jsOneLiner", programArguments, code);
        const execProcess = jsCompiler(program);
        expect(execProcess(["bcba", 3, 3])).to.deep.equal(15);
    });
});

describe("Program typeSignature property", () => {
    it("It returns the type signature of the program", () => {
        const program = new Program(
            "jsOneLiner",
            { b: { type: "number", index: 0 } },
            "b*3"
        );
        expect(program.typeSignature).to.deep.equal("number => ProgramOutputType");
    });

    it("It returns the type signature of the program", () => {
        const progArgs = {
            d: { type: "string", index: 1 },
            b: { type: "number", index: 0 },
        };
        const program = new Program("jsOneLiner", progArgs, "b*3");
        expect(program.typeSignature).to.deep.equal(
            "number => string => ProgramOutputType"
        );
    });
});


describe("Program::toString()", () => {
    it("It returns the code of the program", () => {
        const program = new Program(
            "jsOneLiner",
            { b: { type: "number", index: 0 } },
            "b*3"
        );

        expect(program.toString()).to.deep.equal([
            "//Type Signature: number => ProgramOutputType",
            "//Program Language: jsOneLiner",
            "//UnprocessedCode: b*3"
        ].join("\n"));
    });

    it("It returns the code of the program", () => {
        const program = new Program(
            "jsOneLiner",
            { b: { type: "number", index: 0 } },   
            {
                unprocessedCode: "b*3",
                preProcessor: oneLinerCodePreprocessor,
            }
        );

        expect(program.toString()).to.deep.equal([
            "//Type Signature: number => ProgramOutputType",
            "//Program Language: jsOneLiner",
            `const ${program.ID} = (a) => {\n\tconst b=a[0];\n\treturn b*3;\n}`,
        ].join("\n"));
    })
});