import { Set, ValueType } from "./sets/types";
import { DataPoint } from "./statistics/data-point-class";


export interface DataSetBin extends Set{
   includes: (x: DataPoint | ValueType)=>boolean; 
}

export interface DataSetType extends Set{
    readonly data: DataPoint[]; 
} 

export class DataSet implements DataSetType {

    public readonly data: DataPoint[]; 
    constructor(initialData: DataPoint[]=[]){
        this.data = initialData.map(p => new DataPoint(p)) 
    }
    includes(point: DataPoint | ValueType){
        return this.data.some(dp => dp.isSame(point)); 
    }
}

export class Probability {

    public value: number; 

    constructor(value: number){
        if(value > 1 || value < 0) throw "bad value for probability"
        this.value = value; 
    }

} 

export class Percentage{

    public value: number; 

    constructor(value: number){
        if(value > 100 || value < 0) throw "bad value for percentage"
        this.value = value; 
    }
}