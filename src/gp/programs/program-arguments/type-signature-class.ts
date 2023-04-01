import { tokenize } from "../../../utils/strings/tokenizer";
import { ProgramArguments, ProgramArgument, ProgramInOut } from "../../types";
import { parseTokens } from "./utils";





const _expressionWithAbstraction = (
    typeVariableName: string, 
    programArguments: ProgramArguments): string=>{
        const innerTypeSignature = typeSignatureFromProgramArguments(
            programArguments, 
            typeVariableName);
    return `<${typeVariableName}>.${innerTypeSignature}`;
}

const _expressionWithoutTypeAbstraction = (
    progArguments: Record<string, ProgramArgument>, 
    returnType: string
    ): string=>{
        const argNames = Object.keys(progArguments);
        if (argNames.length === 0) return `()=>${returnType}`;
        const sortedArgNames = argNames.sort(
            (arg1, arg2) => progArguments[arg1].index - progArguments[arg2].index
        );
        const concreteTypeSignature = [
            ...sortedArgNames.map((argName) => {
            return `(${progArguments[argName].type})`;
        }),
        returnType].join(` ${TypeSignature.defaultArrowDelimiter} `);
        return concreteTypeSignature; 
}

export const typeSignatureFromProgramArguments = (
    progArguments: ProgramArguments, 
    returnType: string
    ): string => {
    
        const argIdentifiers = Object.keys(progArguments);

        /***********************************************************************
         * set isTypeAbstraction to true if it is an abstraction type expression
        ***********************************************************************/
        const isTypeAbstraction = argIdentifiers.includes("TypeVariable");
        if(isTypeAbstraction) {
            const typeVariableName = progArguments["TypeVariable"] as string;
            const newProgArguments = {...progArguments};
            delete newProgArguments["TypeVariable"];
            return _expressionWithAbstraction(
                typeVariableName, 
                newProgArguments,
            );
        }

        return _expressionWithoutTypeAbstraction(progArguments as Record<string, ProgramArgument>, returnType);
    }



const _processExpression = (expression: string): string => {
    return parseTokens(tokenize(expression));
};

export class TypeSignature {

    static defaultArrowDelimiter = '=>';
    public readonly expression: string;

    constructor(expression: string | ProgramInOut ) {
        if (typeof expression === 'string'){
            this.expression = _processExpression(expression);
            return; 
        }

        this.expression = typeSignatureFromProgramArguments(
            expression.inputs, 
            expression.outputType);
    }
}


