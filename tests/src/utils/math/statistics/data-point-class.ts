import { expect } from "chai";
import { DataPoint } from "../../../../../src/utils/math/statistics/data-point-class";


describe('DataPoint class', ()=>{

    const ptValue = {x:4, y:3}; 
    const pt = new DataPoint(ptValue); 

    it('it is a container for data point values', ()=>{
        expect(pt.value['x']).to.eq(4); 
        expect(pt.value['y']).to.eq(3); 
    });

    it('it keeps a copy of the value with which it is initialized, but not the object itself', ()=>{
        expect(pt.value === ptValue).to.be.false;
        expect(pt.value).to.eql(ptValue); 
        expect(pt.isSame(ptValue)).to.be.true; 
    }); 

    it('can recognize if another value is the same as it', ()=>{
        expect(pt.isSame(ptValue)).to.be.true; 
        expect(pt.isSame(new DataPoint(ptValue))).to.be.true; 
    }); 
}); 