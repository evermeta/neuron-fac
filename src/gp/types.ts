import { Probability } from "../utils/math/types";
import { DataSet } from "../utils/math/statistics/data-set-class";
import { Percentage } from "../utils/math/proportions/types";
import { Species } from "./species";

export interface EvaluationGrade {
    fitness: number;
}
export type SelectionProbability = (
    populationSize: number,
    evaluationGrade: EvaluationGrade
) => Probability;

export interface Genotype {
    readonly body: Record<string, unknown>;
    readonly species: Species;
}

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

