import { TypeSignature } from "./type-signature-class";


const isArrowType = (typeSignature: string): boolean => {
    return typeSignature.includes(TypeSignature.defaultArrowDelimiter);
};


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

