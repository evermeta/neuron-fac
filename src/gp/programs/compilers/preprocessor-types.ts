import { ProgramArguments } from "../program-arguments/types";
import { Program, ProgramReturnType } from "../program-class";

export type PreProcessor = (
    args: ProgramArguments, 
    unprocessedCode: string | string[], 
    argArrayName?:string)=>string; 
    
export type ExecProcess = (input: unknown[]) => ProgramReturnType;
export type Compiler = (p: Program) => ExecProcess;
    