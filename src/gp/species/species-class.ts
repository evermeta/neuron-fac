import { Program } from "../programs/program-class";
import { ISpecies, ProgramArguments, TypeSignatureTree } from "../types";
import { TypeSignature } from "../programs/program-arguments/type-signature-class";

export type SpeciesID = string;

export interface ProgramSpecies {
    program: Program;
    species: SpeciesID;
}

export class SpeciesPrototype implements ISpecies {

    public readonly programs: Program[];
    public readonly computationUnits: Program[] = [];
    public readonly specification: TypeSignatureTree;
    public readonly typeSignature: TypeSignature;
    public readonly inputs: ProgramArguments 

    constructor(specification: TypeSignatureTree) {
        this.programs = [];
        this.specification = specification;
        this.typeSignature = specification.typeSignature;
        this.inputs =  {};
    }

    addComputationUnit(program: Program): void {
        this.computationUnits.push(program);
    }

}