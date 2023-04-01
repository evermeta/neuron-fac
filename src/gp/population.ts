import { Program } from "./programs/program-class";
import { EvaluationGrade, GenePoolType} from "./types";
import {ObjectWithUUID} from "../utils/uuid";
    
/***********************************
 * A population is composed of:
 *  - A species id
 *  - A map: keys: genotype value:genostatu
 */
 export interface PopulationType {
    genePool: GenePoolType;
}

export type SelectionFunction = (
    population: { programIndex: number; evaluationGrade: EvaluationGrade }[],
    selectionSize: number
) => Program[];

export type EvaluationFunction = (program: Program[]) => Promise<EvaluationGrade[]>;


export type ReplacementFunction = (
    population: Program[],
    newGeneration: Program[]
) => Program[];

export class PopulationPrototype extends  ObjectWithUUID {

    protected _population: Program[] = [];

    constructor() {
        super(); 
    }
    get populationSize(): number {
        return this._population.length;
    }

    addProgram(...programs: Program[]): void {
        programs.forEach(program => {
            this._population.push(program);
        });
    }

    async evaluateAll(evaluationFunction: EvaluationFunction): Promise<EvaluationGrade[]> {
        return await evaluationFunction(this._population);
    }
}
