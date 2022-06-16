import { expect } from 'chai';
import * as FunctionsToTest from '../../../../../src/utils/math/statistics/frequency'; 
import { DataPoint } from '../../../../../src/utils/math/statistics/data-point-class';
import { DataSet, DataSetBin } from '../../../../../src/utils/math/types';
import { ValueType } from '../../../../../src/utils/math/sets/types';



describe('frequency function', ()=>{
    it('It returns the frequency in which datapoints appear in a dataset bin', ()=>{

        const bin: DataSetBin = {
            includes: (pt: DataPoint | ValueType)=> {
                const point = new DataPoint(pt); 
                return point.value['x'] as number < 1 && point.value['y'] as number < 1
            }
        }

        const dataSet = new DataSet(
            [
                new DataPoint({x:4,y:3}),
                new DataPoint({x:1,y:2}), 
                new DataPoint({x:0, y:0.8}), 
                new DataPoint({x:0.4, y: 0.8})
            ]);

        expect(FunctionsToTest.frequency(bin, dataSet)).to.eq(2); 
    }); 

    it('It returns the frequency with which datapoints appear in a dataset bin', ()=>{

        const bin: DataSetBin = {
            includes: (pt: DataPoint | ValueType)=> {
                const point = new DataPoint(pt); 
                return point.value['true'] as boolean;
            }
        }; 

        const dataSet = new DataSet(
            [
                new DataPoint({true: true}),
                new DataPoint({true: true}),
                new DataPoint({true: true}),
                new DataPoint({true: false}), 
                new DataPoint({true: true}), 
                new DataPoint({true: false})
            ]);

        expect(FunctionsToTest.frequency(bin, dataSet)).to.eq(4); 
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
