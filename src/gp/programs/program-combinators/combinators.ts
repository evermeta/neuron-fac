import { ProgramArguments, renumberArgs } from "../program-arguments/types";
import { Program } from "../program-class";



export const partialApplication = (p: Program, args: Record<string, unknown>) => {

    const progArgNames = Object.keys(args); 
    const newProgArgs = {...p.inputs};
    let newCode =  p.code.unprocessedCode;

    progArgNames.forEach((argName) => {
        delete(newProgArgs[argName]);
        newCode = newCode.replace(argName, (args[argName] as number).toString());
    });

    return new Program(
        p.language, 
        renumberArgs(newProgArgs), 
        'number',
        newCode,
        );
}; 
