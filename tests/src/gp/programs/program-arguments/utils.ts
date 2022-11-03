import { Program } from "../../../../../src/gp/programs/program-class";
import { ProgramArguments } from "../../../../../src/gp/types";

export const newJSOneLinerProgram = (
    progArgs: ProgramArguments, 
    code: string, 
    returnType = "Number") => {
    return new Program(
        "jsOneLiner",
        progArgs,
        returnType,
        code
    );
};