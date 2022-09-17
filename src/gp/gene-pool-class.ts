/********************************************
 * Defines + implements module genes
 * - Includes constructors for objects:
 *      - Allele
 *      - genePool
 *
 * references mostlyu blockpopulation.ml in ocaml legacy code
 */

import { ValueType } from "../utils/math/sets/types";
import { DataPoint } from "../utils/math/statistics/data-point-class";
import { DataSet } from "../utils/math/statistics/data-set-class";
import { GenePoolType } from "./types";

//const uuidv4 = require('uuid/v4')

const toDataSet = (ds: ValueType[]): DataPoint[] => ds.map((dp) => new DataPoint(dp));

export class GenePool implements GenePoolType {
    public readonly alleles: DataSet;
    constructor(initSet: ValueType[]) {
        this.alleles = new DataSet(toDataSet(initSet));
    }
    evolve(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
