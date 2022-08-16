import { JSProgramAsJson, JSProgramType } from "./types";

const typeFunction = (
    functionTypeName: string,
    func: (x: unknown) => unknown
): JSProgramType => {


    if (functionTypeName === "boolean") {
        return func as (x: unknown) => boolean;
    } else if (functionTypeName === "number") {
        return func as (x: unknown) => number;
    } else if (functionTypeName === "string") {
        return func as (x: unknown) => string;
    }
    throw "error";
};

export const readFunction = (objFunction: JSProgramAsJson): JSProgramType => {

    
    const result = new Function(
        objFunction.var, 
        `return ${objFunction.funcBody}`);

    return typeFunction(
        objFunction.returnType, 
        result as (x: unknown) => unknown);
};
