import { PopulationType } from "./types";

/***********************************
 * A population is composed of: 
 *  - A species id
 *  - A map: keys: genotype value:genostatu
 */ 
 class Population implements PopulationType{

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