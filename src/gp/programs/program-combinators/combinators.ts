import { ExecProcess } from "../compilers/preprocessor-types";
import { renumberArgs } from "../program-arguments/types";
import { Program } from "../program-class";



export const functionAsString = (arg:string, code:string) => `(${arg} => ${code})`;

const _programPartialApplication = (p: Program, args: any) => {
    const progArgNames = Object.keys(args); 
    const newProgArgs = {...p.inputs};
    let newCode =  p.code.unprocessedCode;

    progArgNames.forEach((argName) => {
        delete(newProgArgs[argName]);
        newCode = `${functionAsString(argName, newCode)}(${args[argName]})`;
        
        //`(${argName} => ${newCode})(${args[argName]})`;
    });

    return new Program(
        p.language, 
        renumberArgs(newProgArgs), 
        'number',
        newCode,
        );
    }; 

export const partialApplication = (
    p: Program | ExecProcess, args: Record<string, unknown>
    ): Program | ExecProcess => {
        
        if(p instanceof Program) return _programPartialApplication(p, args);
        throw new Error("Not implemented yet");
    }; 
     
