import { TypeSignature } from "../programs/program-arguments/type-signature-class";


export type TypeClassifier = (typeSignature: TypeSignature | string) => boolean;

export const atomicType = (typeSignature: TypeSignature): boolean =>{
    return !arrowType(typeSignature) && !typeAbstraction(typeSignature);
};

export const typeAbstraction = (typeSignature: TypeSignature | string): boolean => 
    /^\s*<\s*[A-Z][A-Za-z]*\s*>\s*\.\s*.+\s*$/.test(
        typeof(typeSignature) === "string"
        ? typeSignature
        : typeSignature.expression);


export const arrowType = (typeSignature: TypeSignature | string): boolean => {

    if(typeAbstraction(typeSignature)) return false;
    return (typeof(typeSignature) === "string")
    ?  typeSignature.includes("=>")
    :  typeSignature.expression.includes(TypeSignature.defaultArrowDelimiter);

};
