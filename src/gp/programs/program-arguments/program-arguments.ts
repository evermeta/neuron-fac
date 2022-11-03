/******************************************************************************/

import { ProgramArguments } from "../../types";
/******************************************************************************/

export const renumberArgs = (args: ProgramArguments): ProgramArguments => {
    const argNames = Object.keys(args);
    if(argNames.some((argName) => typeof args[argName] === 'string')) {
        throw new Error("renumberArgs: args must be an object with index/type pairs");
    }

    const sortedArgsList = Object.entries( args as Record<string, { index: number; type: string }>)
        .sort( (a, b) => a[1].index - b[1].index);
    const newArgs: ProgramArguments = {};
    sortedArgsList.forEach((arg, index) => {
        newArgs[arg[0]] = { index, type: arg[1].type };
    });
    return newArgs;  
}


/******************************************************************************/