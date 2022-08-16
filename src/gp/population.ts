import { GenePool } from "./gene-pool-class";
import { GenePoolType, PopulationType, Species } from "./types";

/***********************************
 * A population is composed of:
 *  - A species id
 *  - A map: keys: genotype value:genostatu
 */
export class Population implements PopulationType {
    public readonly genePool: GenePoolType;
    public readonly species: Species;

    constructor(species: Species) {
        this.genePool = new GenePool([]);
        this.species = species;
    }
}

/*= (function(){
    let _populationProto, populationInfo; 

    populationInfo = function({speciesId, ancestorID}){

    }

    _populationProto = {
        _programs: [ ], 
        _specie: undefined 
    }

    return{
        Population: function(){
            this.uuid = uuidv4(); 
        }, 
        newPopulation: function(){
            return new population.Population();
        }
    }
})(); */
