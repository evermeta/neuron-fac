/******************************************************************************
 * 
 ******************************************************************************/

import * as Tokens from "../../../utils/strings/tokenizer";
import { ProgramArguments } from "../../types";
import { TypeSignature } from "./type-signature-class";
/******************************************************************************/

const _tokenToString = (token: string): string => {
    if(token.startsWith("Uc<") && token.endsWith(">")) {
        return token.substring(3, token.length - 1);
    }
    if(token === '<lParen>') {
        return '(';
    }
    if(token === '<rParen>') {
        return ')';
    }
    return token;
};

const _simplify = (expression: string[]): string => {
    if(expression.length === 3) {
        if(expression[0] === '('  && /^[A-Z][A-Za-z]*/.test(expression[1]) && expression[2] === ')') {
            return expression[1];
        }
    }
    return expression.join(' ');
};

export const parseTokens = (tokens: string[]): string => {

    const parenthesisStack: string[] = [];
    const result: string[] = [];
    let inParen = 0;

    tokens.forEach((token) => {

        if (token === "<lParen>") {
            inParen += 1;
            parenthesisStack.push(token);
            return;
        }
        if (token === "<rParen>") {
            const expression: string[] = [token];
            let r: string = parenthesisStack.pop() as string; 
            while (r !== "<lParen>") {
                expression.push(r);
                r = parenthesisStack.pop() as string;
            }
            expression.push(r);
            inParen = inParen - 1;
            const simplified = _simplify(expression.reverse().map(_tokenToString));
            result.push(simplified);
            return;
        }
        if(token === "<rArrow>") {
            if(inParen > 0) {
                parenthesisStack.push("=>");
                return;
            } else {
                result.push('=>');
                return;
            }
        }
  
        if(token === "<dot>") {
            result.push(".");
            return;
        }

        if(token === "<lChevron>") {
            result.push("<");
            return;
        }
        
        if(token === "<rChevron>") {
            result.push(">");
            return;
        }

        if(/^Uc<[A-Z][A-Za-z]*>$/.test(token)) {
            if(inParen > 0) {
                parenthesisStack.push(token);
            } else {
                result.push(token.replace(/Uc<|>/g, ''));
            }
            return;
        }
        
        throw(new Error("Invalid token: " + token)); 
    });

    return result.join(" ");
};

//detects all atomic types in a type signature
export const atomicTypes = (
    typeSignature: TypeSignature | string
    ): string[] => {

    const tokens = Tokens.tokenize( 
        typeof(typeSignature) === 'string' 
            ? typeSignature 
            : typeSignature.expression
        )
    
    const UpperCaseSymbols = tokens.filter(token => /Uc<\w+>/.test(token));
    const typeSet = new Set(UpperCaseSymbols) as Set<string>;
    const result = Array.from(typeSet).map(type => type.replace(/Uc<|>/g, ''));
    return result;  
}
/********************************************************************************
 Objects of type ProgramArguments are the inputs that a program takes, 
 indexed by position.
********************************************************************************/
export const programArgumentsFromTypeSignature = (typeSignature: TypeSignature): ProgramArguments => {

        const args: ProgramArguments = {};
        const argTypes = typeSignature.expression.split(
            TypeSignature.defaultArrowDelimiter
        );
        argTypes.forEach((argType, index) => {
            args[`arg${index}`] = { index, type: argType.trim() };
        });
        return args;

};

