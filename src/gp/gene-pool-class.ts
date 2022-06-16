/********************************************
 * Defines + implements module genes
 * - Includes constructors for objects: 
 *      - Allele
 *      - genePool
 * 
 * references mostlyu blockpopulation.ml in ocaml legacy code 
 */

import { Allele, GenePoolType } from "./types";

//const uuidv4 = require('uuid/v4')
export class GenePool implements GenePoolType  {

    public readonly alleles: Allele[] = []; 
    constructor(){

    }
}
