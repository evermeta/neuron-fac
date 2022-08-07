import { TypeSignature } from "./type-signatures";
import { ProgramArguments } from "./types";

/********************************************************************************
Program arguments are the set of arguments that a program takes, indexed by position.
********************************************************************************/

export const getSignature = (
    progArguments: ProgramArguments, 
    returnType: string
    ): TypeSignature => {

    const argNames = Object.keys(progArguments);
    if (argNames.length === 0) {
        return "()";
    }
    const sortedArgNames = argNames.sort(
        (arg1, arg2) => progArguments[arg1].index - progArguments[arg2].index
    );
    return  [
        ...sortedArgNames.map((argName) => progArguments[argName].type), 
        returnType].join(" => "); 
};