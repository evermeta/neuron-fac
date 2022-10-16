import { ProgramArguments } from "../program-arguments/program-arguments";
import { Program, ProgramReturnType } from "../program-class";

export type PreProcessor = (
    args: ProgramArguments, 
    unprocessedCode: string | string[], 
    argArrayName?:string)=>string; 
    
export type ExecProcess = (input: unknown[]) => ProgramReturnType;

/*******************************************************************************
 * A compiler is a function that takes a program's genotype and an indication of
 * the language in which the program is written, and returns an execution process
 * that can execute on the platform it is running on.
 ******************************************************************************/
export type Compiler = (p: Program) => ExecProcess;
    