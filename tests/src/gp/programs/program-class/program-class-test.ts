/******************************************** 
This project's goal is to produce a machine learning algorithm (theory and implementation) 
that can learn to program in javascript. 

Setting the set K = R U S U B,  and trained on data sets in the shape (X\in K^n, Y\in K) the 
algorithm will produce javascript programs that map X to Y. There will be no other indication
given to the algorithm about the nature of the data, and the same algorithm should work no matter
the arity of the input vector or the types of its elements, and the same is true for the output.

examples: 

given the output:

'fa', 3, 'fafafa'
'ab', 2, 'abab'
'c', 1, 'c'
'fa', 4, 'fafafafa'
....
the algorithm should produce a function that takes a string and a number argument and returns the string represented by n repetition. 

given the output:
3, 2, 9
4, 3, 64
5, 4, 625
....
the algorithm should produce a function that takes 2 numerical arguments and returns the number x^y

given the output:
3, true, 
4, false, 
11, true,
23, true,
24, false, 
....
the algorithm should produce a function that takes one numrical argument and returns 
true if x is prime, and false otherwise. 


If there are difficulties, the project can be scaled down by considering only a strict subset of K for the inputs
if the project is too easy, the project can be scaled up by considering adding more dimensions to Y

The measure of success will be the a combination of the variety of programs that the system will be able produce, as well as their complexity. 

There are going to be several challenges, and I'm still working through them. In particular, I'm going to have to ensure that the programs produced do not contain
infinite loops, syntax errors, runtime errors, type errors, etc.
***************************************************************/
import { expect } from "chai";
import { Program } from "../../../../../src/gp/programs/program-class";
import { ProgramArguments } from "../../../../../src/gp/programs/program-arguments/program-arguments";
import { jsCompiler } from "../../../../../src/gp/programs/compilers/jsCompiler";

const newJSOneLinerProgram = (programArguments: ProgramArguments, code: string) => new Program(
        "jsOneLiner",
        programArguments, 
        "number",
        code,
    );
describe("The Program class", () => {

    it("It has a unique 36 char uuid", () => {

        const program = new Program(
            "js", 
            { a: { index: 0, type: "number" }}, 
            "number", "" );

        expect(program.ID).to.be.a("string");
        expect(program.ID.length).to.be.eq(36);
    });

    it("It corresponds to a process that can be executed using a compiler", () => {
        const program = newJSOneLinerProgram( 
            { 
                b: { type: "number", index: 0 } 
            }, "b*3");
        const executableProgram = jsCompiler(program);
        expect(executableProgram([3])).to.deep.equal(9);


        const programTwo = newJSOneLinerProgram( { 
            a: { type: "number", index: 0 },
            b: { type: "number", index: 1 } 
        }, "b*a");

        const executableProcessTwo = jsCompiler(programTwo);
        expect(executableProcessTwo([2,5])).to.deep.equal(10);

    });

    it("It can be transformed into an executable process using a compiler", () => {
        const program = newJSOneLinerProgram(
            { b: { type: "string", index: 0 } },
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
        expect(program.typeSignature.expression)
            .to.deep.equal("(number) => number");
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
        expect(program.typeSignature.expression).to.deep.equal(
            "(number) => (string) => number"
        );
    });
});

