/******************************************************************************
 * 
 * ***************************************************************************/

import { Probability } from "../utils/math/types";
import { DataSet } from "../utils/math/statistics/data-set-class";
import { Percentage } from "../utils/math/proportions/types";
import { TypeSignature } from "./programs/program-arguments/type-signature-class";
import { Program } from "./programs/program-class";
/******************************************************************************/

export interface ITypedObject {
    typeSignature: TypeSignature
    inputs: ProgramArguments
}
/******************************************************************************/

export const combinators = {
    arrow: '=>',
    dot: '.',
}

export type Combinator = keyof typeof combinators;
/******************************************************************************/
export type ProgramArgument = {
    type: string;
    index: number;
};

export type ProgramArguments = Record<string, string | ProgramArgument>;

export type ProgramInOut = {
    inputs: ProgramArguments;
    outputType: string;
}
/******************************************************************************/

export type TypeSignatureLeaf = TypeSignature | null;

export interface TypeSignatureNode {
    typeSignature: TypeSignature;
    combinator: keyof typeof combinators; 
    left: TypeSignatureNode | TypeSignatureLeaf; 
    right: TypeSignatureNode | TypeSignatureLeaf;
} 

export type TypeSignatureTree = {
    typeSignature: TypeSignature;
    root: TypeSignatureNode | TypeSignatureLeaf;
}
/******************************************************************************/

export type ProgramReturnType = number;

export type Code = {
    unprocessedCode: string;
    preProcessor?: (args: ProgramArguments, unprocessedCode: string)=>string;
}

export interface ProgramType {
    readonly language?: string;
    readonly typeSignature: TypeSignature;
    readonly code: Code;
}
/******************************************************************************/

export interface ISpecies extends ITypedObject {
    specification: TypeSignatureTree;
    programs: Program[];
}


export interface EvaluationGrade {
    fitness: number;
}

export type SelectionProbability = (
    populationSize: number,
    evaluationGrade: EvaluationGrade
) => Probability;

export type Allele = {
    ID: number;
    fitness: EvaluationGrade;
    selectionProbability: SelectionProbability; //the probability of selecting this allele in a generation event
    spread: Percentage; //the percentage of appearance of this allele in the gene pool
};

export interface GenePoolType {
    readonly alleles: DataSet;
    evolve(): Promise<void>;
}

