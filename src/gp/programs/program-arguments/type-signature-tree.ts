/******************************************************************************/

import { Combinator, combinators, TypeSignatureTree, TypeSignatureNode, TypeSignatureLeaf } from "../../types";
import { TypeSignature } from "./type-signature-class";

/******************************************************************************/
const _combine = (combinator: Combinator, left: string, right: string): TypeSignature => {
    return new TypeSignature(`${left} ${combinators[combinator]} ${right}`);
}; 

const applyTypeSignatureCombinator = (
    combinator: Combinator, 
    left: TypeSignatureNode | TypeSignatureLeaf, 
    right: TypeSignatureNode | TypeSignatureLeaf,
    ): TypeSignature => {
    
    if(combinator === 'arrow') {
        return  _combine(combinator, 
            (left && 'typeSignature' in left 
                ? left.typeSignature.expression
                :'Fdsa'),
            (right && 'typeSignature' in right
                ? right.typeSignature.expression
                : 'Fdsa'));
    }

    throw new Error(`Unknown combinator: ${combinator}`);
}

const _makeTypeSignatureNode = (
        node: TypeSignatureNode | TypeSignatureLeaf
    ): TypeSignature=> {

    if(node === null) {
        throw(new Error('Cannot make a type signature node from a null value'));
    }
    if('typeSignature' in node) {
        return new TypeSignature(node.typeSignature.expression);
    }
    return node;
}

export const makeTypeSignatureNode = (options: {
    combinator?: Combinator;
    left: TypeSignatureNode | TypeSignatureLeaf;
    right?: TypeSignatureNode | TypeSignatureLeaf;
}): TypeSignatureTree => {

    if (!('combinator' in options)) return {
        root: options.left,
        typeSignature: _makeTypeSignatureNode(options.left)
    };

    const combinator = options.combinator as Combinator; 
    if(!('right' in options)) {
        throw new Error(`Right side of type signature node is missing`);
    }
    const typeSignature = applyTypeSignatureCombinator(
        combinator, 
        options.left, 
        options.right as TypeSignatureNode | TypeSignatureLeaf);

    return {
        typeSignature,
        root: {
            combinator,
            typeSignature,
            left: options.left,
            right: options.right as TypeSignatureNode | TypeSignatureLeaf 
        }
    }
}