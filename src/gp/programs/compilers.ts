/********************************************************************************
 * A compiler is a function that takes a program's genotype and an indication of
 * the language in which the program is written, and returns an execution process
 * that can execute on the platform it is running on.
 **********************************************************************************/
import { ProgramInputType } from "../functions/types";
import { PreProcessor } from "../../programs/preprocessors/preprocessor-types";
import { ProgramArguments } from "./program-arguments/types";
import { Program, ProgramReturnType } from "./program-class";

export type ExecProcess = (input: ProgramInputType) => ProgramReturnType;
export type Compiler = (p: Program) => ExecProcess;

//processes one liner js code, for example: 'b*3' or 'b.toString().length * c'
export const oneLinerCodePreprocessor: PreProcessor = (
    inputs: ProgramArguments, 
    unprocessedCode: string
    ): string => {

    const compilerHeaderCode = Object.keys(inputs)
        .map((inputName) => `const ${inputName}=a[${inputs[inputName].index}];`)
        .join("\n");

    return [
        compilerHeaderCode,
        `return ${unprocessedCode};`
    ].join("\n");
};

export const jsCompiler: Compiler = (p: Program) => {

    const supportedLanguages = ["jsOneLiner"];

    if (supportedLanguages.includes(p.language) === false) {
        throw `Unsupported language ${p.language}`;
    }
    const executable = new Function(
        "a", 
        oneLinerCodePreprocessor(
            p.inputs, 
            p.code.unprocessedCode
        ));

    return (context: unknown) => executable(context);
};
