/******************************************************************************
 * 
 *****************************************************************************/
import { TypeSignature } from "./type-signature-class";
import { ProgramArguments } from "./program-arguments";

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

/********************************************************************************
 * Construct a type signature from a ProgramArguments object and a return type.
 ********************************************************************************/
/*export const typeSignatureFromProgramArguments = (
    progArguments: ProgramArguments, 
    returnType: string
    ): TypeSignature => {

   const argNames = Object.keys(progArguments);
   const sortedArgNames = argNames.sort(
        (arg1, arg2) => 
            (progArguments[arg1] as ProgramArgument).index 
            - (progArguments[arg2] as ProgramArgument).index
    );

    if (sortedArgNames.length === 0) {
        return new TypeSignature("()");
    }

    const typeSignature = new TypeSignature([
        ...sortedArgNames.map((argName) => (progArguments[argName] as ProgramArgument).type),
        returnType
    ].join(` ${TypeSignature.defaultArrowDelimiter} `));

    return typeSignature;
};*/