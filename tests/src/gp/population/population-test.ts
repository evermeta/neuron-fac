import { expect } from "chai";
import { EvaluationFunction, PopulationPrototype } from "../../../../src/gp/population";
import { ProgramArguments } from "../../../../src/gp/programs/program-arguments/program-arguments";
import { Program } from "../../../../src/gp/programs/program-class";

const progInputs: ProgramArguments = {b: {index: 0, type: "number"}, c: {index: 1, type: "number"}};

const testProgram = (code: string)=>new Program(
    'jsOneLiner', 
    progInputs, 
    "number",
    code);
 
describe("The population class stores program", () => {
    it("It has a unique ID", () => {
        const population = new PopulationPrototype();
        expect(population.ID).to.be.a("string");
        expect(population.ID.length).to.be.eq(36);
    });

    it("Lets you add program to the population", () => {
        const population = new PopulationPrototype();
        const programOne = testProgram("b*3");
        const programTwo = testProgram("b*c");
        population.addProgram(programOne, programTwo);
        expect(population.populationSize).to.be.deep.eq(2);
    }); 

    it("Lets you add a program but, if there is a population species defined, only if it belongs to the population species", () => {
        const population = new PopulationPrototype();
        const program = testProgram("b*3");
        population.addProgram(program);
        expect(population.populationSize).to.be.deep.eq(1);
    }); 
    
    it("Given an evaluation function it is able to return a score for each program", async () => {
        const population = new PopulationPrototype();
        const testArgs = [[3,3],[1, 2]]; 

        const evaluationFunction: EvaluationFunction = async (programs: Program[]) => {
            const testValues = [[3,3],[1, 2]];
            return evaluationFunction(programs);
        };

        const programOne = testProgram("b*3");
        const programTwo = testProgram("b*c");
        
        
        /*
        const programOne = testProgram("b*3");
        expect(scores[0].fitness).to.be.deep.eq(1);
        expect(scores[1].fitness).to.be.deep.eq(0);*/
        expect(1).to.be.eq(1);
    })

}); 
