
/************************************************************************************************************************ 
A proof is a set of input sentences 'axioms' combined with a set of input production rules called 'productionRules' 
combined with an index set of sentences 'derivedSentences'. Each sentence s_i in 'derivedSentences' is either

a) an axiom (element of 'axioms'), or
b) the result of the application of a production rule in 'productionRules' applied to a subset of sentences 
    {s_j: j < i and s_j is in 'derivedSentences'} 

The last sentence in the proof is the conclusion of the proof.
************************************************************************************************************************/

type Index = number;
export type Sentence = string;
export type ProductionRule = (...args: Sentence[]) => Sentence;

export type DerivationArgument = 
        { axiom: Index; } 
    |   { derivedSentence: Index; }
    ;


export interface IProof {

    axioms              : Sentence[] ;
    productionRules     : ProductionRule[] ;
    
    derivations: {
        derivationArguments : DerivationArgument[] ;
        productionRule      : Index;
    }[];

    conclusion: Sentence;
}


const _last = (sentences: Sentence[]): Sentence => 
    sentences[sentences.length - 1];


const _verifyDerivation = (
    proof: IProof, 
    derivationIndex: number, 
    previousDerivations: Sentence[]
    ): Sentence => {

    const derivation = proof.derivations[derivationIndex];

    const productionRule = proof.productionRules[
        derivation.productionRule];

    const ruleArguments: Sentence[] = derivation.derivationArguments.map(
        (i: DerivationArgument): Sentence => {
            if('axiom' in i) return proof.axioms[i.axiom];
            return previousDerivations[i.derivedSentence];
        }
    ); 

    return productionRule(...ruleArguments); 
}; 

export const verifyProof = (proof: IProof): boolean => {
    const derivedSentences: Sentence[] = []; 
    for (let i = 0; i < proof.derivations.length; i++) {
        derivedSentences.push(_verifyDerivation(proof, i, derivedSentences));
    }
    return _last(derivedSentences) === proof.conclusion; 
}