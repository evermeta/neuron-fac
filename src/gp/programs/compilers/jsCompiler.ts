/*******************************************************************************
* The oneLinerCodePreprocessor function processes one liner js code, such as, 
* for example: 'b*3', 'b.toString().length * c', or 'b + c + d', etc.
* The raw code must be a valid js expression, when prefixed by the keyword 'return'.
*
* One of the arguments, unprocessedCode, can be either a string of one or 
* more lines of code. 
*
* Ultimately, the function returns a single string of javascript code that 
* can be executed by any javascript engine. 
* *****************************************************************************/

import { ExecProcess, PreProcessor } from "./preprocessor-types";
import { ProgramArgument, ProgramArguments } from "../program-arguments/program-arguments";
import { Program } from "../program-class";
/******************************************************************************/

export const oneLinerCodePreprocessor: PreProcessor = (
    inputs: ProgramArguments, 
    unprocessedCode: string | string[], 
    argArrayName
): string => {
     
    const compilerHeaderCode = Object.keys(inputs)
    .filter((argName) => argName !== 'TypeVariable')
    .sort((a, b) => (inputs[a] as ProgramArgument).index 
            - (inputs[b] as ProgramArgument).index)
    .map((inputName) => {
            const input = inputs[inputName] as ProgramArgument;
            return `const ${inputName}=${argArrayName}[${input.index}];`;
        }).join("\n");
    /**************************************************************************/ 

    if(Array.isArray(unprocessedCode)) {
        throw new Error("Not implemented yet");
    }
    /**************************************************************************/ 

    return [
        `/** Program Inputs **/`,
        compilerHeaderCode,
        `/${Array(78).join('*')}/`,
        `return ${unprocessedCode};`].join("\n");
 };
/******************************************************************************/ 
/******************************************************************************/ 

const _jsOneLinerCompiler = (p: Program): ExecProcess => {

    const functionArgumentName = '_x' + p.ID.replace(/-/g, '_');
     //_jsFunctionArgumentNames(p.inputs); 
    const processedCode = oneLinerCodePreprocessor(
        p.inputs, 
        p.code.unprocessedCode,
        functionArgumentName); 
    /**************************************************************************/

    const executable = new Function( functionArgumentName, processedCode );
    return (context: unknown) => executable(context);
};

export const jsCompiler = (p: Program): ExecProcess => {

    const supportedLanguages = ["jsOneLiner"];

    if (!supportedLanguages.includes(p.language)) 
        throw `Unsupported language ${p.language}`; 

    return _jsOneLinerCompiler(p);
};