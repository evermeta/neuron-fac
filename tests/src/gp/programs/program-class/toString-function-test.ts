import { expect } from "chai";
import { Program } from "../../../../../src/gp/programs/program-class";
import { partialApplication } from "../../../../../src/gp/programs/program-combinators/combinators";
import { ProgramArguments } from "../../../../../src/gp/types";
/******************************************************************************/

const _p = (testDescription: string[]) => testDescription.join(" ");

const testArgumentsOne = { 
    c_1:    { type: "Number", index: 0 }, 
    c_2:    { type: "Number", index: 1 }, 
    theta:  { type: "Number", index: 2 } 
};

const newOneLineProgram = (code: string) => 
    (progArguments:ProgramArguments) => 
        new Program(
            "jsOneLiner",
            progArguments,
            "Number",
            code
        );
/******************************************************************************/

describe("Program::toString()", () => {
    it(_p([ "It returns the code of the program",
            "in a human readable version, Test One"]), () => {

        const program = newOneLineProgram("b*3") (
            { b: { type: "Number", index: 0 }}
        );
        const programAsString = program.toString();
        expect(programAsString).to.deep.equal([
            "//Type Signature: Number => Number",
            "b:Number",
            "b*3"
        ]); 
    });

    it(_p([ "It returns the code of the program", 
            "in a human readable version, Test Two"]), () => {

        const program = newOneLineProgram("b*c")(
            {   c: { type: "Number", index: 0 }, 
                b: { type: "Number", index: 1 } 
            });
        const programAsString = program.toString();
        expect(programAsString).to.deep.equal([
            "//Type Signature: Number => Number => Number",
            "c:Number,b:Number",
            `b*c`,
        ]);
    }); 

    it( [ "It returns the code of",
          "the program in a human",
          "readable version, Test Three"].join(' '), () => {

        const functionAsString = "theta*(c_1 - c_2)";
        const p1 = new Program(
            "jsOneLiner",
            testArgumentsOne,
            'Number',
            { unprocessedCode: functionAsString }
        );

        const programAsString = (partialApplication(p1,{theta: 3})).toString();

        expect(programAsString).to.deep.equal([
            "//Type Signature: Number => Number => Number",
            "c_1:Number,c_2:Number",
            `(theta => ${functionAsString})(3)`,
        ]);
    }); 
    /*************************************************************************/

    it( _p(["It returns the code of",
            "the program in a human",
            "readable version, Test Four"]),() => {
                
        const functionAsString = "theta*(c_1 - c_2)";
        const p1 = new Program(
                "jsOneLiner",
                testArgumentsOne,
                'Number',
                { unprocessedCode: functionAsString }
        );
    
        const programAsString = (
            partialApplication(p1, {theta: 3, c_1: 2})
        ).toString();
    
        expect(programAsString).to.deep.equal([
                "//Type Signature: Number => Number",
                "c_2:Number",
                `(c_1 => (theta => ${functionAsString})(3))(2)`,
        ]);
    })

});