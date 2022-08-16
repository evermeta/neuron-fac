import { ProgramArguments } from "../../gp/programs/program-arguments/types";

export type PreProcessor = (args: ProgramArguments, unprocessedCode: string)=>string;