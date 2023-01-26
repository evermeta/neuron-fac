/******************************************************************************/

import { TypeSignature } from "./type-signature-class";

/******************************************************************************/
export const combinators = {
    arrow: '=>'
}
export type Combinator = keyof typeof combinators;

const _combine = (combinator: Combinator, left: string, right: string): TypeSignature => {
    return new TypeSignature(`${left} ${combinators[combinator]} ${right}`);
}; 

export type TypeSignatureLeaf = TypeSignature | null;
export interface TypeSignatureNode {
    combinator: keyof typeof combinators; 
    typeSignature: TypeSignature;
    left: TypeSignatureNode | TypeSignatureLeaf; 
    right: TypeSignatureNode | TypeSignatureLeaf;
} 

export type TypeSignatureTree = TypeSignatureNode | TypeSignatureLeaf;

const applyTypeSignatureCombinator = (
    combinator: Combinator, 
    left: TypeSignatureTree, 
    right: TypeSignatureTree
    ): TypeSignature => {
    
    if(combinator === 'arrow') {
        return  _combine(combinator, 
            (left && 'typeSignature' in left 
                ? left.typeSignature.expression
                :'fdsa'),
            (right && 'typeSignature' in right
                ? right.typeSignature.expression
                : 'fdsa'));
    }

    throw new Error(`Unknown combinator: ${combinator}`);
}

export const makeTypeSignatureNode = (options: {
    combinator?: Combinator;
    left: TypeSignatureNode | TypeSignatureLeaf;
    right?: TypeSignatureNode | TypeSignatureLeaf;
}): TypeSignatureTree => {

    if (!('combinator' in options)) return options.left;
    const combinator = options.combinator as Combinator; 
    if(!('right' in options)) {
        throw new Error(`Right side of type signature node is missing`);
    }
    const typeSignature = applyTypeSignatureCombinator(
        combinator, 
        options.left, 
        options.right as TypeSignatureNode | TypeSignatureLeaf);

    return {
        combinator,
        typeSignature,
        left: options.left,
        right: options.right as TypeSignatureNode | TypeSignatureLeaf 
    }
}