import { GenePool } from "./gene-pool-class";
import { Program } from "./programs/program-class";
import { Set } from "../utils/math/sets/types";

export type SpeciesID = string;

export interface Species extends Set {
    recombinationFunction: (programs: Program[], genePool: GenePool) => Program[];
    createRandomProgram: (genePool: GenePool) => Program;
    evolve: () => Promise<void>;
    ID: SpeciesID;
}
