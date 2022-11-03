/******************************************************************************/

import { tokenize } from "../../../utils/strings/tokenizer";
import * as is from "../../type-signatures/types";
import { TypeSignature } from "./type-signature-class";
import { atomicTypes } from "./utils";
/******************************************************************************/


export const abstractType = (

    typeSignature: TypeSignature | string, 
    typeToAbstract: TypeSignature | string

    ): TypeSignature => {
    //constructs an abstract type signature from a type signature and the 
    //type within it to abstract
    const expressionAtomicTypes = atomicTypes(typeSignature);
    //1. come up with a new type variable name
    const ts = [
        "< X > ." , 
        (typeof typeSignature === "string" 
        ?  typeSignature
        :  typeSignature.expression)
        .replace(/Number/g, "X")
    ].join(" ");



    const typeToAbstractionTokens = typeof typeToAbstract === "string"
        ? tokenize(typeToAbstract)
        : tokenize(typeToAbstract.expression);

    return new TypeSignature("TODO");
}

export const arrowType = (
    left: TypeSignature | string,
    right: TypeSignature | string
    ): TypeSignature =>{
        let leftTypeSignature = left instanceof TypeSignature 
            ? left.expression 
            : left; 

        if(is.arrowType(leftTypeSignature)){
            leftTypeSignature = `(${leftTypeSignature})`;
        }
        
        const rightTypeSignature = right instanceof TypeSignature
            ? right.expression
            : right;

        return new TypeSignature(`${leftTypeSignature} => ${rightTypeSignature}`)
    }

