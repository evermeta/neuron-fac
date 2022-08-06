import { TypeSignature } from "./type-signatures";
import { ObjectWithUUID } from "../../utils/uuid";
import { ExecProcess } from "./compilers";
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
export type Code = string;

export interface ProgramType {
    readonly language?: string;
    readonly typeSignature: TypeSignature;
    readonly code: Code;
}

export type ProgramArguments = Record<string, { index: number; type: string }>;

const _getSignature = (progArguments: ProgramArguments): string => {
    const argNames = Object.keys(progArguments);
    if (argNames.length === 0) {
        return "()";
    }
    const sortedArgNames = argNames.sort(
        (arg1, arg2) => progArguments[arg1].index - progArguments[arg2].index
    );
    return sortedArgNames.map((argName) => progArguments[argName].type).join(" => ");
};

export class Program extends ObjectWithUUID implements ProgramType {

    public readonly speciesID: string | undefined;
    /**********************************************************************/
    public readonly typeSignature: string;
    public readonly code: Code;
    public readonly language: string;
    public readonly inputs: ProgramArguments;
    public compiledVersion: ExecProcess | null = null;

    constructor( 
        language: string, 
        inputs: ProgramArguments = {}, 
        code: Code, 
        options: {speciesID?: string}= {}
    ) {
        /**********************************************************************/
        super();
        if("speciesID" in options && options.speciesID !== undefined) {
            this.speciesID = options["speciesID"];
        }
        this.inputs = inputs;
        this.code = code;
        this.language = language;
        this.typeSignature = `${_getSignature(this.inputs)} => ProgramOutputType`;
    }
}
