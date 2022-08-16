import { ProgramArguments } from "../program-arguments/types";

export type PreProcesssor = (args: ProgramArguments, unprocessedCode: string)=>string;