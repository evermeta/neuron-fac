import { SYMBOLS } from "../../../utils/strings/tokenizer";
import { TypeSignature } from "./type-signature-class";


const isArrowType = (typeSignature: string): boolean => {
    return typeSignature.includes(TypeSignature.defaultArrowDelimiter);
};

export const abstractTypeSignature = (typeSignature: TypeSignature, typeToAbstract: TypeSignature): string => {
    //constructs an abstract type signature from a type signature and the 
    //type within it to abstract

    //1. come up with a new type variable name
    const typeSignatureToken  = tokenize(typeSignature.expression);
    const typeToAbstractToken = tokenize(typeToAbstract.expression);

    return '';
}

export const arrowTypeSignature = (
    left: TypeSignature | string,
    right: TypeSignature | string
    ): TypeSignature =>{
        let leftTypeSignature = left instanceof TypeSignature 
            ? left.expression 
            : left; 

        if(isArrowType(leftTypeSignature)){
            leftTypeSignature = `(${leftTypeSignature})`;
        }
        
        const rightTypeSignature = right instanceof TypeSignature
            ? right.expression
            : right;

        return new TypeSignature(`${leftTypeSignature} => ${rightTypeSignature}`)
    }

function tokenize(expression: string) {
    throw new Error("Function not implemented.");
}

