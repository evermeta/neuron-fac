"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const FunctionsToTest = __importStar(require("../../../../../src/utils/math/statistics/frequency"));
const data_point_class_1 = require("../../../../../src/utils/math/statistics/data-point-class");
const types_1 = require("../../../../../src/utils/math/types");
describe('frequency function', () => {
    it('It returns the frequency in which datapoints appear in a dataset bin', () => {
        const bin = {
            includes: (pt) => {
                const point = new data_point_class_1.DataPoint(pt);
                return point.value['x'] < 1 && point.value['y'] < 1;
            }
        };
        const dataSet = new types_1.DataSet([
            new data_point_class_1.DataPoint({ x: 4, y: 3 }),
            new data_point_class_1.DataPoint({ x: 1, y: 2 }),
            new data_point_class_1.DataPoint({ x: 0, y: 0.8 }),
            new data_point_class_1.DataPoint({ x: 0.4, y: 0.8 })
        ]);
        (0, chai_1.expect)(FunctionsToTest.frequency(bin, dataSet)).to.eq(2);
    });
    it('It returns the frequency with which datapoints appear in a dataset bin', () => {
        const bin = {
            includes: (pt) => {
                const point = new data_point_class_1.DataPoint(pt);
                return point.value['true'];
            }
        };
        const dataSet = new types_1.DataSet([
            new data_point_class_1.DataPoint({ true: true }),
            new data_point_class_1.DataPoint({ true: true }),
            new data_point_class_1.DataPoint({ true: true }),
            new data_point_class_1.DataPoint({ true: false }),
            new data_point_class_1.DataPoint({ true: true }),
            new data_point_class_1.DataPoint({ true: false })
        ]);
        (0, chai_1.expect)(FunctionsToTest.frequency(bin, dataSet)).to.eq(4);
    });
});
/*it('Creates an executable function from a function definition (an object of type OjbFunction)', ()=>{
        const coorgTest: ObjFunction = {
            funcBody: "a.ar === b.ar",
            returnType: 'boolean'
        }
        const testFuncOne = readFunction(coorgTest);
        expect(testFuncOne({ar:"fdsa"}, {ar:"fdsa"})).to.equal(true);
        expect(testFuncOne({ar:"fdscla"}, {ar:"fdsa"})).to.equal(false);
        expect(testFuncOne({ard:"fdscla"}, {ar:"fdsa"})).to.equal(false);
    });*/
