"use strict";
/********************************************
 * Defines + implements module genes
 * - Includes constructors for objects:
 *      - Allele
 *      - genePool
 *
 * references mostlyu blockpopulation.ml in ocaml legacy code
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenePool = void 0;
const data_point_class_1 = require("../utils/math/statistics/data-point-class");
const types_1 = require("../utils/math/types");
//const uuidv4 = require('uuid/v4')
const toDataSet = (ds) => ds.map((dp) => new data_point_class_1.DataPoint(dp));
class GenePool {
    constructor(initSet) {
        this.alleles = new types_1.DataSet(toDataSet(initSet));
    }
}
exports.GenePool = GenePool;
