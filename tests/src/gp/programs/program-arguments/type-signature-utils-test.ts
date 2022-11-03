/*****************************************************************************/

import { expect } from "chai";
import { TypeSignature } from "../../../../../src/gp/programs/program-arguments/type-signature-class";
import { parseTokens} from "../../../../../src/gp/programs/program-arguments/utils";
import { tokenize } from "../../../../../src/utils/strings/tokenizer";
/*****************************************************************************/

describe("The parseTokens function", () => {
    
    it("Can be constructed from an array of tokens", () => {
        const tokens = tokenize(new TypeSignature("String => Number").expression); 
        const parsed = parseTokens(tokens);
        expect(parsed).to.equal("String => Number");
    });

    it("Ignores unecessary parenthesis", () => {
        const tokens = tokenize(
            new TypeSignature("(String) => Number").expression
        ); 
        const parsed = parseTokens(tokens);
        expect(parsed).to.equal("String => Number");
    });


});