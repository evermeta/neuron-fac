/******************************************************************************
 * 
 *****************************************************************************/
import { TypeSignature } from "./type-signature-class";
import { ProgramArguments } from "./program-arguments";

export const typeSignatureIsTypeAbstraction = (typeSignature: TypeSignature) => {
    const typeAbstractionPattern = /^<.>\..+$/;
    const result = typeAbstractionPattern.test(typeSignature.expression);
    return result;  
};

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

