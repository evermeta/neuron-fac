"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Population = void 0;
const gene_pool_class_1 = require("./gene-pool-class");
/***********************************
 * A population is composed of:
 *  - A species id
 *  - A map: keys: genotype value:genostatu
 */
class Population {
    constructor(species) {
        this.genePool = new gene_pool_class_1.GenePool([]);
        this.species = species;
    }
}
exports.Population = Population;
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
