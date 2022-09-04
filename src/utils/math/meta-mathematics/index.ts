/*******************************************************************************
 *  FranckEinstein90 made this
 *  IProof interface, models a sequential deduction
*******************************************************************************/

import { 
    DerivationArgument, Sentence,
    Sentences, IProof, 
    lastSentence, Derivation, Index
} from "./types";

/******************************************************************************/
const _derivationArguments = ( 
        derivation                      : Derivation, 
        axioms                          : Sentences, 
        previousDerivationConclusions   : Sentences
    ): Sentences => 

    derivation.derivationArguments.map(
        ( arg: DerivationArgument ): Sentence => {
            if( 'axiom' in arg ) return axioms[ arg.axiom ] ;
            return previousDerivationConclusions[ arg.derivedSentence ] ;
        }
    ); 

/******************************************************************************/
const _verifyDerivation = (
    proof               : IProof, 
    derivationIndex     : Index, 
    previousDerivations : Sentences
    ): Sentence => {

    const derivation = proof.derivations[ derivationIndex ] ;
    const productionRule = proof.productionRules[ derivation.productionRule ] ;
    const ruleArguments = _derivationArguments(
        derivation,
        proof.axioms,
        previousDerivations
    ) ;
    return productionRule( ...ruleArguments ) ; 
}; 

/******************************************************************************/
export const verifyProof = (proof: IProof): boolean => {

    const derivedSentences: Sentences = [] ; 
    let derivationIndex = 0 ; 

    while ( derivationIndex < proof.derivations.length ) {
        const derivedSentence = _verifyDerivation( proof, derivationIndex, derivedSentences ) ; 
        derivedSentences.push( derivedSentence ) ;  
        derivationIndex += 1 ; 
    } 

    return lastSentence( derivedSentences ) === proof.conclusion ; 

}; 
