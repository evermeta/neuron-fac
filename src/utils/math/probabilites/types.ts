import { ValueType } from "../sets/types";
import { DataPoint } from "../statistics/data-point-class";


export type ArgSpecification = Record<string, {
    generate: (rand01: number)=>number; 
    type?: string
    }>;

export const newRandomDataPointFunction = (args: ArgSpecification) => (): DataPoint => {
    let returnValue: ValueType = {}; 
    Object
        .keys(args)
        .forEach((propertyName) => returnValue = { ...returnValue, [propertyName]: args[propertyName].generate(Math.random()) });
    return new DataPoint(returnValue);
};
