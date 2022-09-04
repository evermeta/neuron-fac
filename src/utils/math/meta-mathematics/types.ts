/*******************************************************************************
 *  FranckEinstein90 made this
 *  proof relatedted types and interfaces.
*******************************************************************************/

export type Index           = number ;
export type Sentence        = string ;
export type Sentences       = Sentence[] ;
/******************************************************************************/

export const lastSentence   = ( sentences: Sentences ) => 
    sentences[ sentences.length - 1 ] ;
/******************************************************************************/

export type ProductionRule = ( ...args: Sentence[] ) => Sentence ;
export type ProductionRules = ProductionRule[] ; 
/******************************************************************************/

export type Axiom = { axiom: Index; } ; 
export type DerivedSentence = { derivedSentence: Index ; } ;
export type DerivationArgument = Axiom | DerivedSentence ; 

export type Derivation = {
    derivationArguments: DerivationArgument[] ;
    productionRule: Index ;
} ;

export type Derivations = Derivation[] ;

/*******************************************************************************
A proof is a structure that compounds: 

-   a set of indexed Sentences called 'axioms' 

-   a set of indexed productionRules, best described as functions 
    that produce new sentences from a set of sentences, constructed 
    from sentences included in the axioms or from previous derivations.  
    If the production rule is unable to produce a sentence given its 
    supplied arguments, it throw an error. 

-   a conclusion sentence, that can be reconstructed through successive 
    applications of the provided proof derivations, by storing the 
    resulting sub-conclusions of each previous applications of the proof's 
    production rules in sequential order in an indexed store, and re-using 
    those as inputs to subsequent production rule applications. 

 Once the proof re-constructed, the last sentence obtained by the method 
 described above should match conclusion of the proof. 
*******************************************************************************/

export interface IProof {

    axioms              : Sentences ;
    productionRules     : ProductionRules ;
    derivations         : Derivations ; 
    conclusion          : Sentence ;

}
/******************************************************************************/
