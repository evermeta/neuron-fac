/* eslint-disable @typescript-eslint/no-unused-vars */
export type Token = {
    name: string, 
    recognize: (input: string, currentIndex: number) => { value: string, consumedChars: number } 
}

export const SYMBOLS = {
    lp : '<lParen>',
    rp : '<rParen>',
    ra : '<rArrow>', 
};

export const matchSymbol = (symbol: string | RegExp, char: string): boolean => {
    if(typeof symbol === "string") return symbol === char;
    return symbol.test(char);
};

const tkens = [

    { pattern: /^[a-z]+$/, 
        symbol: (word: string) =>`lc<${word}>`},

    { pattern: /^[A-Z][A-Za-z]*$/, 
        symbol: (word: string) =>`Uc<${word}>`},

    { pattern: /^[0-9]+$/, 
        symbol: (word: string) =>`num<${word}>`},
    
    { pattern: /^=>$/,  symbol: (word: string) => SYMBOLS.ra},
    /**************************************************************************/
    { pattern: /^\($/,  symbol: (word: string) => SYMBOLS.lp},
    { pattern: /^\)$/,  symbol: (word: string) => SYMBOLS.rp}, 
    /**************************************************************************/
    { pattern: /^\.$/, symbol: (word: string) =>`<dot>`},
    { pattern: /^,$/,  symbol: (word: string) =>`<comma>`},
    /**************************************************************************/
    { pattern: /^<$/,      symbol: (word: string) =>`<lChevron>`},
    { pattern: /^>$/,      symbol: (word: string) =>`<rChevron>`},
];

const preProcess = (input: string): string => {
    return input
        .replace(/\(/g,  ' ( ')
        .replace(/\)/g,  ' ) ')
        .replace(/=>/g,  ' =# ')
        .replace(/\./g,  ' . ')
        .replace(/,/g,   ' , ')
        .replace(/</g,   ' < ')
        .replace(/>/g,   ' > ')
        .replace(/\s+/g, ' ')
        .replace(/=#/g,  ' => ')
        .trim();
};

export const tokenize = (input: string): string[] => {
    let currentCharIndex = 0;
    const result =  preProcess(input)
        .split(/\s+/)
        .map(word => {
            const token = tkens.find(t => t.pattern.test(word));
            return token
            ? token.symbol(word)
            : word;
    })
    while(currentCharIndex  < input.length){
        currentCharIndex++; 
    }
    return result;
}