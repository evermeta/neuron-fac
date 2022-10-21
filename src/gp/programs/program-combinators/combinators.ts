import { stringify } from "querystring";
import { ExecProcess } from "../compilers/preprocessor-types";
import { typeSignatureIsTypeAbstraction } from "../program-arguments/utils";
import { ProgramArgument, ProgramArguments, renumberArgs } from "../program-arguments/program-arguments";
import { Program } from "../program-class";
/*****************************************************************************/

type typeVariableInfo = {
    typeVariableName: string;
    type: string;
};
const _strReplaceIn = (
    replacementString: string,
    stringToReplace: string,  
    containerString: string
    ): string => {

    if(stringToReplace === containerString) {
        return replacementString;
    }
    return containerString; 
}

export const functionAsString = (arg:string, code:string) => 
    `(${arg} => ${code})`;

const _replaceIn = (
    varName: string,
    varValue: unknown,  
    programInputs: ProgramArguments
    ): void => {
        Object.keys(programInputs).forEach(
            inputArgument => {
                const argSpec = programInputs[inputArgument];
                if(typeof(argSpec) === 'string'){
                    return; 
                }
                if('type' in argSpec) {
                    argSpec.type = _strReplaceIn(
                        varValue as string, 
                        varName, 
                        argSpec.type)
                }
            }); 
        };


const _programPartialApplication = (
    p: Program, 
    argValues: Record<string, unknown>
    ): Program => {

        const variableNames = Object.keys(argValues); 
        const newProgInputs = {...p.inputs};
        let newCode =  p.code.unprocessedCode;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        variableNames.forEach( varName => {
            delete(newProgInputs.TypeVariable);
            if(typeof(newProgInputs[varName]) === "object"){
                newCode = `${functionAsString(varName, newCode)}(${argValues[varName]})`;
            } else {
                _replaceIn(varName, argValues[varName], newProgInputs);
            }
        });

        variableNames.forEach((argName) => {
            if(typeof(newProgInputs[argName]) === "object"){
                delete(newProgInputs[argName]);
            }
        });

        return new Program(
            p.language, renumberArgs(newProgInputs), 
            'number', newCode,
        );
    }; 

export const partialApplication = (
    p: Program | ExecProcess, 
    argValues: Record<string, unknown> 
    ): Program | ExecProcess => {
    /**************************************************************************/    
        if(p instanceof Program) return _programPartialApplication(p, argValues);
        throw new Error("Not implemented yet");
    }; 
     
