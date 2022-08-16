import { ProgramArguments } from "../../gp/programs/program-arguments/types";
import { PreProcessor } from "./preprocessor-types";

export const jsCodePreprocessor: PreProcessor = (
    inputs: ProgramArguments, 
    unprocessedCode: string
    ): string => {

    const compilerHeaderCode = Object.keys(inputs)
        .map((inputName) => `const ${inputName}=a[${inputs[inputName].index}];`)
        .join("\n");

    return [
        compilerHeaderCode,
        `${unprocessedCode};`
    ].join("\n");
};