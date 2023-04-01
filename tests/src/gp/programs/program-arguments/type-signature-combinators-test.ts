/*****************************************************************************/

import { expect } from "chai";
import { abstractType, arrowType } from "../../../../../src/gp/programs/program-arguments/type-signature-combinators";
/*****************************************************************************/


describe("The arrowType combinator", () => {
    it("Makes a type signature from two types, left and right", () => {
        const typeSignature = arrowType("String", "Number");
        expect(typeSignature.expression).to.equal("String => Number");
    });
});

describe("The abstractType combinator", ()=>{
    it("Makes a type signature from two types, left and right", () => {
        const typeSignature = abstractType("Number => Number => Number", "Number");
        expect(typeSignature.expression).to.equal("String => Number");
    });
})