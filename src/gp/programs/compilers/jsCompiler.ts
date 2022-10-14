/********************************************************************************
 * A compiler is a function that takes a program's genotype and an indication of
 * the language in which the program is written, and returns an execution process
 * that can execute on the platform it is running on.
 **********************************************************************************/

import { Compiler, ExecProcess, PreProcessor } from "./preprocessor-types";
import { ProgramArguments } from "../program-arguments/types";
import { Program } from "../program-class";


 
 //processes one liner js code, for example: 'b*3' or 'b.toString().length * c'
 export const oneLinerCodePreprocessor: PreProcessor = (
     inputs: ProgramArguments, 
     unprocessedCode: string | string[], 
     argArrayName
     ): string => {
     
     const compilerHeaderCode = Object.keys(inputs)
         .map((inputName) => `const ${inputName}=${argArrayName}[${inputs[inputName].index}];`)
         .join("\n");
    
         if(Array.isArray(unprocessedCode)) {
            throw new Error("Not implemented yet");
         }
        return [
            `/** Program Inputs **/`,
            compilerHeaderCode,
            `/${Array(78).join('*')}/`,
            `return ${unprocessedCode};`
        ].join("\n");
 

 };
 
const _jsOneLinerCompiler: Compiler = (p: Program): ExecProcess => {
    const functionArgumentName = '_x' + p.ID.replace(/-/g, '_');
     //_jsFunctionArgumentNames(p.inputs); 
    const processedCode = oneLinerCodePreprocessor(
        p.inputs, 
        p.code.unprocessedCode,
        functionArgumentName); 

     const executable = new Function( functionArgumentName, processedCode );
 
     return (context: unknown) => executable(context);
    }

 
 export const jsCompiler: Compiler = (p: Program): ExecProcess => {
 
     const supportedLanguages = ["jsOneLiner"];
 
     if (supportedLanguages.includes(p.language) === false) {
         throw `Unsupported language ${p.language}`;
     }
     return _jsOneLinerCompiler(p);
 };
 