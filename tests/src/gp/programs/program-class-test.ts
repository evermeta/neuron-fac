import { expect } from "chai";
import { Program } from "../../../../src/gp/programs/program-class";
import { 
    jsCompiler, 
    oneLinerCodePreprocessor } from "../../../../src/gp/programs/compilers";


describe("The Program class", () => {

    it("It has a unique 36 char uuid", () => {

        const program = new Program(
            "js", 
            { a: { index: 0, type: "number" }}, 
            "number", "" );

        expect(program.ID).to.be.a("string");
        expect(program.ID.length).to.be.eq(36);
    });

    it("It can be transformed into an executable process using a compiler", () => {
        const program = new Program(
            "jsOneLiner",
            { b: { type: "number", index: 0 } },
            "number",
            "b*3"
        );
        expect(jsCompiler(program)([3])).to.deep.equal(9);
    });

    it("It can be transformed into an executable process using a compiler", () => {
        const program = new Program(
            "jsOneLiner",
            { b: { type: "string", index: 0 } },
            "number",
            "b.toString().length"
        );
        expect(jsCompiler(program)(["baba"])).to.deep.equal(4);
    });

    it("The program can accept several arguments", () => {

        const programArguments = {
            b: { type: "string", index: 0 },
            c: { type: "number", index: 1 },
        };

        const program = new Program(
            "jsOneLiner", 
            programArguments, 
            "number",
            "b.toString().length * c"
        );

        expect(jsCompiler(program)(["bcba", 3])).to.deep.equal(12);
    });

    it("In any order", () => {
        const programArguments = {
            d: { type: "number", index: 2 },
            c: { type: "number", index: 1 },
            b: { type: "string", index: 0 },
        };

        const program = new Program(
            "jsOneLiner", 
            programArguments, 
            "number",
            "b.toString().length * c + d");
        
        expect(jsCompiler(program)(["bcba", 3, 3])).to.deep.equal(15);
    });
});

describe("Program typeSignature property", () => {
    it("It returns the type signature of the program", () => {
        const program = new Program(
            "jsOneLiner",
            { b: { type: "number", index: 0 } },
            "number",
            "b*3"
        );
        expect(program.typeSignature).to.deep.equal("number => number");
    });

    it("It returns the type signature of the program", () => {
        const progArgs = {
            d: { type: "string", index: 1 },
            b: { type: "number", index: 0 },
        };
        const program = new Program(
            "jsOneLiner", 
            progArgs, 
            "number",
            "b*3"
        );
        expect(program.typeSignature).to.deep.equal(
            "number => string => number"
        );
    });
});


describe("Program::toString()", () => {
    it("It returns the code of the program", () => {
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


    it("It returns the code of the program", () => {

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
            `const ${program.ID} = (a) => {\n\tconst c=a[0];\n\tconst b=a[1];\n\treturn b*c;\n}`,
        ].join("\n"));
    }); 


});