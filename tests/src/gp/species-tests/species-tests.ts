import { expect } from "chai";
import { TypeSignature } from "../../../../src/gp/programs/program-arguments/type-signature-class";
import { makeTypeSignatureNode } from "../../../../src/gp/programs/program-arguments/type-signature-tree";
import { Program } from "../../../../src/gp/programs/program-class";
import { SpeciesPrototype } from "../../../../src/gp/species/species-class";
import { ProgramArguments, TypeSignatureTree } from "../../../../src/gp/types";

const progInputs: ProgramArguments = {
    b: {index: 0, type: "Number"}, 
    c: {index: 1, type: "Number"}};

const testProgram = (code: string)=>new Program(
    'jsOneLiner', 
    progInputs, 
    "Number",
    code);

const programOne = testProgram("b*3");

describe("SpeciesPrototype class", () => {

    it("...", () => {
        const signatureTree: TypeSignatureTree =
        makeTypeSignatureNode({
            combinator: 'arrow', 
            left: new TypeSignature('Number'),
            right: new TypeSignature('Number')
        });

        const species = new SpeciesPrototype(signatureTree);
        species.addComputationUnit(programOne);
        expect(species.programs.length).to.deep.equal(0);
    });
}); 

