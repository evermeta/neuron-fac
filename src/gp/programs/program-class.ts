import { TypeSignature } from "./program-arguments/type-signatures";
import { ObjectWithUUID } from "../../utils/uuid";
import { ExecProcess } from "./compilers";
import { ProgramArguments } from "./program-arguments/types";
import { getSignature } from "./program-arguments/get-signature";
/*****************************************************************************
 * A program's genotype is the set of genes that it carries,
 * and the blueprint by which they are combined (its species).
 *
 * The program's species is a proof (see Curry-Howard isomorphism)
 *
 * done is to compose genotype in executable code, then
 * run that code run in an execution context (a world).
 *
 * Then, by observation, you can see how it behaves, and if it solves
 * the problem we wan t it to solve, or if not, how close
 * it comes to solving them, and its execution needs to be
/*****************************************************************************
*  Objects of type 'Program' contain their genotype under the property
*  'code'. There is no phenotype. A phenotype would be the observable
*  characteristics of a prgram when  executed in a given environement, a "world."

*  I assumed that no two execution environment are ever exactly similar. 

* You can't "obtain" a program's phenotype
* because that's just a name for the infinity of things that happen when
* a program is executed into an environment.
*
* I interpret or compile a program's code into an executable 
* execution process
* - observe its behavior while its running
* - grade the quality of its output once its execution has terminated
*
* keeping in mind that whatevery metric you obtain this
* is only valid for that particular world. k
*
* So a "phenotype" resolves to a metric on the characteristics you care about
* in that world.
* *****************************************************************************/

export type ProgramReturnType = number;

export type Code = {
    unprocessedCode: string;
    preProcessor?: (args: ProgramArguments, unprocessedCode: string)=>string;
}


export interface ProgramType {
    readonly language?: string;
    readonly typeSignature: TypeSignature;
    readonly code: Code;
}

export class TypedObject extends ObjectWithUUID {

    readonly typeSignature: TypeSignature;
    public readonly inputs: ProgramArguments;

    constructor(
        inputs: ProgramArguments, 
        outputType: string
        ){
        super();
        this.inputs = inputs;
        this.typeSignature = getSignature(this.inputs, outputType);
    }

    toString(){
        return `//Type Signature: ${this.typeSignature}`;
    }
} 

export class Program extends TypedObject implements ProgramType {

    public readonly speciesID: string | undefined;
    /**********************************************************************/
    public readonly code: Code;
    public compiledVersion: ExecProcess | null = null;

    constructor( 
        public readonly language: string, 
        inputs: ProgramArguments = {}, 
        outputType = 'ProgramOutputType',
        code: Code | string, 
        options: {
            speciesID?: string
        }= {}
    ) {

        super(inputs, outputType);

        if("speciesID" in options && options.speciesID !== undefined) {
            this.speciesID = options["speciesID"];
        }

        this.code = typeof code === "string" 
            ? {unprocessedCode: code} 
            : code;
    }

    toString() {
       
        const format = (code: string) => {
            return [
                `const ${this.ID} = (a) => {`,
                ...code.split("\n"), 
            ].join('\n\t') + '\n}';
        }; 

        const code = this.code.preProcessor
            ? format(this.code.preProcessor(this.inputs, this.code.unprocessedCode))
            : `//UnprocessedCode: ${this.code.unprocessedCode}`; 

        return [
            super.toString(),
            `//Program Language: ${this.language}`,
            `${code}`,
        ].join("\n");
    }
}
