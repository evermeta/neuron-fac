import { expect } from "chai";
import { getSignature } from "../../../../../src/gp/programs/program-arguments/get-signature";
import { renumberArgs } from "../../../../../src/gp/programs/program-arguments/types";

describe("RenumberArgs function", () => {
    it("It renumbers the an argument object so it starts at 0 index and is sequential", () => {
        const testArgu = {
            a: { index: 3, type: "number" },
            c: { index: 2, type: "number" },
        } 
        expect(renumberArgs(testArgu)).to.deep.equal({
            c: { index: 0, type: "number" },
            a: { index: 1, type: "number" },
        });
    });
});


