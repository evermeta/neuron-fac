/*****************************************************************************/

import { expect } from "chai";
import { TypeSignature, typeSignatureFromProgramArguments } from "../../../../../src/gp/programs/program-arguments/type-signature-class";
import { arrowType } from "../../../../../src/gp/programs/program-arguments/type-signature-combinators";
import { atomicTypes } from "../../../../../src/gp/programs/program-arguments/utils";
import * as is from "../../../../../src/gp/type-signatures/types";
import { ProgramArguments } from "../../../../../src/gp/types";
import { newJSOneLinerProgram } from "./utils";
/*****************************************************************************/

describe("The TypeSignature class", () => {
    
    it("Can be constructed from a string: One", () => {
        const typeSignature = new TypeSignature("String => Number");
        expect(typeSignature.expression).to.equal("String => Number");
        expect(is.arrowType(typeSignature)).to.be.true;
        expect(atomicTypes(typeSignature)).to.deep.equal(["String", "Number"]);
    });

    it("Can be constructed from a string: Two", () => {
        const typeSignature = new TypeSignature("<X>.(String => X) => X => X");
        expect(typeSignature.expression).to.equal("< X > . ( String => X ) => X => X");
        expect(is.typeAbstraction(typeSignature)).to.be.true;
        expect(atomicTypes(typeSignature)).to.deep.equal(["X", "String"]);
    });

    it("Can be constructed from a string: Three", () => {
        const typeSignature = new TypeSignature("Action");
        expect(typeSignature.expression).to.equal("Action");
        expect(is.atomicType(typeSignature)).to.be.true;
        expect(atomicTypes(typeSignature)).to.deep.equal(["Action"]);
    });

    it("Can also be constructed from a ProgramArguments object: One", () => {
        const progArgs: ProgramArguments = {
            arg0: { index: 0, type: "String" },
            arg1: { index: 1, type: "Number" }
        };
        const typeSignature = new TypeSignature({
            outputType: "Number",
            inputs: progArgs
        });
        expect(typeSignature.expression).to.equal("(String) => (Number) => Number");
    });

    it("It returns an error when the types are not correctly defined", () => {

        const testSignature =  new TypeSignature(
                typeSignatureFromProgramArguments(
                    { b: { type: "Number", index: 0 }},
                    'Whatever')
            );

        expect(testSignature.expression).to.deep.equal("Number => Whatever");
        expect(is.arrowType(testSignature)).to.be.true;
    });
});

describe("TypeSignatures with regards to programs", () => {
    it([ "A program is capable of calculating its own type", 
         "signature, based on its argument and return value"].join(' '), () => {
        const progArgs = { 
            d: { type: "String", index: 1 }, 
            b: { type: "Number", index: 0 } };
        const program = newJSOneLinerProgram(progArgs, "b*3");
        expect(program.typeSignature.expression).to.deep.equal(
            "Number => String => Number"
        );
    });
});


describe("The TypeSignature class, with regards to type abstractions", () => {

    it( [   "A TypeSignature object can be constructed from ", 
            "a ProgramArguments object ",
            "that specifies one type variable"].join(''), () => {

        const progArgs: ProgramArguments = {
           "TypeVariable": "X",
           "arg1": { index: 0, type: "Number => X"},
            "arg2": {index: 2, type: "X" }
        }; 
        const typeSignature = new TypeSignature({
            outputType: "X",
            inputs: progArgs
        });
        expect(typeSignature.expression).to.equal("<X>.(Number => X) => (X) => X");
    });
});

describe("The typeArrow combinator", ()=>{
    it("Can be used to construct a type signature", ()=>{
        const typeSignature = arrowType("Number", "String");
        expect(typeSignature.expression).to.equal("Number => String");
    });

    it("Can be used to construct a type signature", ()=>{
        const typeSignature = arrowType("Number => Number", "String");
        expect(typeSignature.expression).to.equal("( Number => Number ) => String");
    });

})