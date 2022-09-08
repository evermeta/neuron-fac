import { GenePool } from "../gene-pool-class";
import {
    EvaluationFunction,
    PopulationPrototype,
    ReplacementFunction,
    SelectionFunction,
} from "../population";
import { EvaluationGrade} from "../types";
import { Program } from "./program-class";
import { Species } from "../species";

const POPULATION_SIZE = 100;
const SELECTION_SIZE = 10;

export class ProgramPopulation extends PopulationPrototype {
    public readonly progs: Program[] = [];

    protected evaluationFunction: EvaluationFunction;
    protected selectionFunction: SelectionFunction;
    protected replacementFunction: ReplacementFunction;

    constructor(
        species: Species,
        evaluationFunction: EvaluationFunction,
        selectionFunction: SelectionFunction,
        replacementFunction: ReplacementFunction
    ) {
        super(); 
        const genePool = new GenePool([]);
        super(/*genePool, species*/);
        this.evaluationFunction = evaluationFunction;
        this.selectionFunction = selectionFunction;
        this.replacementFunction = replacementFunction;
    }

    async evolve(): Promise<void> {
//        await super.evolve();
 /*       while (this.progs.length < POPULATION_SIZE) {
            this.progs.push(this.species.createRandomProgram(this.genePool));
        }*/
      /*  const population = await this.evaluate();
        const selectionSample = this.selectionFunction(population, SELECTION_SIZE);*/
        /*const newGeneration = await this.species.recombinationFunction(
            selectionSample,
            this.genePool
        );*/
        //this.replacementFunction(this.progs, newGeneration);
    }

   /* async evaluate(): Promise<
        { programIndex: number; evaluationGrade: EvaluationGrade }[]
    > {
        const evaluations = this.progs.map((prog) => this.evaluationFunction(prog));

        return Promise.all(evaluations).then((grades) => {
            return this.progs.map((prog, index) => ({
                programIndex: index,
                evaluationGrade: grades[index],
            }));
        });
    }*/
}
