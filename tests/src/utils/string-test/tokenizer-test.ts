import { expect } from "chai";
import { tokenize } from "../../../../src/utils/strings/tokenizer";
import {SYMBOLS} from "../../../../src/utils/strings/tokenizer";


const S = SYMBOLS;

describe("Tokenize function", () => {
    it("It tokenizes an input string", () => {
        const result = tokenize("no parenthesis here");
        expect(result).to.deep.equal([
            'lc<no>', 'lc<parenthesis>', 'lc<here>']);
    }); 
});

describe("Tokenizer and type signatures", () => {

    it("tokenizes arrow types::Test one", () => {
        const result = tokenize(["A => B"].join(''));
        expect(result).to.deep.equal(
            ["Uc<A>", "<rArrow>", "Uc<B>"]
        );
    });

    it("tokenizes arrow types::Test two", () => {
        const result = tokenize(["(A => B)=>A"].join(''));
        expect(result).to.deep.equal([
            S.lp, "Uc<A>", S.ra, "Uc<B>", "<rParen>", 
            "<rArrow>", "Uc<A>"
        ]);
    });
    
    it("", () => {
        const result = tokenize(["Number => B => ( B )"].join(''));
        expect(result).to.deep.equal([
            "Uc<Number>", S.ra, "Uc<B>", 
            S.ra,
            "<lParen>", "Uc<B>", "<rParen>" 
        ]);
    });

    it("", () => {
        const result = tokenize("<X>. (Boolean => X) => ( B ) => X"); 
        expect(result).to.deep.equal([
            "<lChevron>", "Uc<X>", "<rChevron>", "<dot>",
            S.lp, "Uc<Boolean>", "<rArrow>", "Uc<X>", "<rParen>",
            "<rArrow>", "<lParen>", "Uc<B>", "<rParen>", 
            "<rArrow>", "Uc<X>"
        ]);
    });

    it("", () => {
        const result = tokenize(`
            <X,Y>.
                (Boolean => X)
                => ( B ) 
                => X
        `); 

        expect(result).to.deep.equal([
            "<lChevron>", "Uc<X>", "<comma>", "Uc<Y>", "<rChevron>","<dot>",
                "<lParen>", "Uc<Boolean>", "<rArrow>", "Uc<X>", "<rParen>",
                "<rArrow>", "<lParen>", "Uc<B>", "<rParen>", 
                "<rArrow>", "Uc<X>"
        ]);
    });

});     

