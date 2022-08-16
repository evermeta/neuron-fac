import { Set } from "../utils/math/sets/types";
import { DataSet, Percentage, Probability } from "../utils/math/types";

type FitnessScore = number;
type SpeciesID = number;

export interface Species extends Set {
    ID: SpeciesID;
}

export interface Genotype {
    readonly body: Record<string, unknown>;
    readonly species: Species;
}

export type Allele = {
    ID: number;
    fitness: FitnessScore;
    selectionProbability: Probability; //the probability of selecting this allele in a generation event
    spread: Percentage; //the percentage of appearance of this allele in the gene pool
};

export interface GenePoolType {
    readonly alleles: DataSet;
}

export interface PopulationType {
    genePool: GenePoolType;
    species: Species;
}
