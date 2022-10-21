/******************************************************************************
 * 
 *****************************************************************************/
import * as Tokens from "../../../utils/strings/tokenizer";
import { TypeSignature } from "./type-signature-class";
import { ProgramArguments } from "./program-arguments";

export const typeSignatureIsTypeAbstraction = (typeSignature: TypeSignature) => {
    const typeAbstractionPattern = /^<.>\..+$/;
    const result = typeAbstractionPattern.test(typeSignature.expression);
    return result;  
};

//detects all atomic types in a type signature
export const atomicTypes = (typeSignature: TypeSignature): string[] => {
    const typeSignatureToken = Tokens.tokenize(typeSignature.expression)
        .filter(token => /Up<\w+>/.test(token));
    const typeSet = new Set(typeSignatureToken) as Set<string>;
    const result = Array.from(typeSet).map(type => type.replace(/Up<|>/g, ''));
    return result;  
}
/********************************************************************************
 Objects of type ProgramArguments are the inputs that a program takes, 
 indexed by position.
********************************************************************************/
export const programArgumentsFromTypeSignature = 
    (typeSignature: TypeSignature): ProgramArguments => {

        const args: ProgramArguments = {};
        const argTypes = typeSignature.expression.split(
            TypeSignature.defaultArrowDelimiter
        );
        argTypes.forEach((argType, index) => {
            args[`arg${index}`] = { index, type: argType.trim() };
        });
        return args;

    };

