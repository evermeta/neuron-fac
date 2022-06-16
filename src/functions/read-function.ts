import { ObjFunction } from "./types";

export const readFunction = (
    objFunction: ObjFunction
): ((a: unknown, b: unknown) => boolean) => {
    if (objFunction.returnType === "boolean") {
        return new Function("a", "b", `return ${objFunction.funcBody}`) as (
            a: unknown,
            b: unknown
        ) => boolean;
    }
    throw "error";
};
