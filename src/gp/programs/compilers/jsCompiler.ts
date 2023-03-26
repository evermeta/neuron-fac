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
import _ from "lodash";
import { Compiler, ExecProcess, PreProcessor } from "./preprocessor-types";
import { Program } from "../program-class";
import { ProgramArgument, ProgramArguments } from "../../types";
/******************************************************************************/

export const programSectionDivider = "/*****************************************************************************/";

const _typeGuard = (argType: string, argName: string) => {
    switch (argType) {
        case "Number":
            return `if(typeof ${argName} !== 'number') throw new Error('Type Error: Expected a number');`;
        case "String":
            return `if(typeof ${argName} !== 'string') throw new Error('Type Error: Expected a string');`;
        case "Boolean":
            return `if(typeof ${argName} !== 'boolean') throw new Error('Type Error: Expected a boolean');`;
        default:
            return "";
    }
};

export const oneLinerCodePreprocessor: PreProcessor = (
    inputs: ProgramArguments, 
    unprocessedCode: string | string[], 
    argArrayName
): string[] => {

    const programVariableNames = Object.keys(inputs)
        .filter((argName) => argName !== 'TypeVariable')
        .map((argName) => ({
            index: (inputs[argName] as ProgramArgument).index,
            name: argName,
            argType: (inputs[argName] as ProgramArgument).type,
        }))
        .sort((a, b) => a.index - b.index);

    const compilerHeaderCode = _.flatten(programVariableNames 
        .map((input) => [
            `const ${input.name}=${argArrayName}[${input.index}];`,
            _typeGuard(input.argType, input.name)
        ]));
    /**************************************************************************/ 

    if(Array.isArray(unprocessedCode)) {
        throw new Error("Not implemented yet");
    }
    /**************************************************************************/ 

    return [
        `/** Program Inputs **/`,
        ...compilerHeaderCode,
        programSectionDivider,
        `return ${unprocessedCode};`]
 };

export const _rawJsCompiler = (p: Program): ExecProcess => {

    const executable = new Function(p.code.unprocessedCode);
    return (context: unknown) => executable(context);
};

const _jsOneLinerCompiler = (p: Program): ExecProcess => {

    const functionArgumentName = '_x' + p.ID.replace(/-/g, '_');
    const processedCode = oneLinerCodePreprocessor(
        p.inputs, 
        p.code.unprocessedCode,
        functionArgumentName); 
    /**************************************************************************/

    const executable = new Function( functionArgumentName, processedCode.join('\n') );
    return (context: unknown) => executable(context);
};

export const jsCompiler: Compiler = (p: Program): ExecProcess => {

    if(p.language === "jsOneLiner") return _jsOneLinerCompiler(p); 
    if(p.language === "javascript") return _rawJsCompiler(p);
    throw `Unsupported language ${p.language}`;
};