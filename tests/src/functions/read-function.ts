import {expect} from 'chai';
import {readFunction} from '../../../src/functions/read-function';
import { ObjFunction } from '../../../src/functions/types';

describe('readFunction function', ()=>{

    it('Creates an executable function from a function definition (an object of type OjbFunction)', ()=>{
        const coorgTest: ObjFunction = {
            funcBody: "a.ar === b.ar",
            returnType: 'boolean'
        }
        const testFuncOne = readFunction(coorgTest);
        expect(testFuncOne({ar:"fdsa"}, {ar:"fdsa"})).to.equal(true);
        expect(testFuncOne({ar:"fdscla"}, {ar:"fdsa"})).to.equal(false);
        expect(testFuncOne({ard:"fdscla"}, {ar:"fdsa"})).to.equal(false);
    });
});
