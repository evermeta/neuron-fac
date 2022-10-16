import { expect } from "chai";
import * as ItemsToTest from "../../../../../src/utils/math/meta-mathematics/index";

const identity = (A: ItemsToTest.Sentence) => {
    return A;
}; 

const modusPonens = (

    A: ItemsToTest.Sentence, 
    B: ItemsToTest.Sentence ) => {

        const AElements = A.split('=>');
        if(AElements.length !== 2) throw new Error(
                `Rule is not applicable, ${A} does not match pattern X=>Y`); 
        if(B === AElements[0]) return AElements[1];
        throw new Error('rule is not applicable:left side does not match');
    }  


describe("The 'verifyProof function", () => {

  
   it("It returns true when the proof is valid (example 1)", () => {

        const p: ItemsToTest.IProof = {

            axioms: ["D", "D=>C"],
            productionRules: [identity, modusPonens],
            derivations: [ 
                {
                    derivationArguments : [{axiom:0}],
                    productionRule      : 0,
                }
            ],
            conclusion: "D", 
        }; 

        const result = ItemsToTest.verifyProof(p);
        expect(result).to.equal(true);
    });
   
    it("It returns true when the proof is valid (example 2)", () => {

        const p: ItemsToTest.IProof = {
            axioms: ["D", "D=>C"],
            productionRules: [modusPonens],
            derivations: [ 
                {
                    derivationArguments: [ {axiom:1}, {axiom:0}],
                    productionRule: 0,
                }
            ],
            conclusion: "C", 
        }; 

        const result = ItemsToTest.verifyProof(p);
        expect(result).to.equal(true);
    });

    it("It returns true when the proof is valid (example 3)", () => {
        const p: ItemsToTest.IProof = {
            axioms: ["D", "D=>C", "C=>A"],
            productionRules: [modusPonens],
            derivations: [ 
                {
                    derivationArguments: [{axiom:1},{axiom:0}],
                    productionRule: 0,
                }, 
                {
                    derivationArguments: [{axiom:2}, {derivedSentence:0}],
                    productionRule: 0,
                },
            ],
            conclusion: "A",
        }; 

        const result = ItemsToTest.verifyProof(p);
        expect(result).to.equal(true);
    });

    it("It returns false when the proof is not valid", () => {
        const p: ItemsToTest.IProof = {
            axioms: ["A", "A=>E"],
            productionRules: [modusPonens],
            derivations: [ {
                derivationArguments: [{axiom:1},{axiom:0}],
                productionRule: 0,
            }],
            conclusion: "M"
        }; 

        const result = ItemsToTest.verifyProof(p);
        expect(result).to.equal(false);
    }); 

}); 
