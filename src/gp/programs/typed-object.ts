/******************************************************************************
 * A typed object is a object that has a type signature. It also extends the 
 * ObjectWithUUID class.
 * FranckEinstein90, 2022
 * ****************************************************************************/

import { ObjectWithUUID } from "../../utils/uuid";
import { ProgramArguments } from "./program-arguments/program-arguments";
import { 
    TypeSignature, 
    typeSignatureFromProgramArguments 
} from "./program-arguments/type-signature-class";
/******************************************************************************/

interface ITypedObject {
    typeSignature: TypeSignature
    inputs: ProgramArguments
}

export class TypedObject extends ObjectWithUUID implements ITypedObject {

    public readonly typeSignature: TypeSignature;
    public readonly inputs: ProgramArguments;

    constructor(
        inputs: ProgramArguments, 
        outputType: string
        ){
        super();
        this.inputs = inputs;
        this.typeSignature = new TypeSignature(typeSignatureFromProgramArguments(this.inputs, outputType));
    }

    toString(){
        return [`//Type Signature: ${this.typeSignature.expression}`]
    }
} 