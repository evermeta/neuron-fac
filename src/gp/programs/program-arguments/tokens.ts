import { SYMBOLS, TokenRecognizer } from "../../../utils/strings/tokenizer";

const tokenPatterns = [

    { 
        pattern: /^[a-z]+$/, 
        toToken: (word: string) =>`lc<${word}>`},

    { 
        pattern: /^[A-Z][A-Za-z]*$/, 
        toToken: (word: string) =>`Uc<${word}>`},

    { 
        pattern: /^[0-9]+$/, 
        toToken: (word: string) =>`num<${word}>`},
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    { 
        symbol: "=>",
        pattern: /^=>$/,  
        toToken: (word: string) => SYMBOLS.ra, 
        fromToken: (token: string) => '=>'
    },
    /**************************************************************************/
    { 
        symbol: "(", 
        pattern: /^\($/,  
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        toToken: (word: string) => SYMBOLS.lp,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        fromToken: (token: string) => '('
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    { 
        symbol: ")", 
        pattern: /^\)$/,  
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        toToken: (word: string) => SYMBOLS.rp, 
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        fromToken: (token: string) => ')'
    },
    /**************************************************************************/
    { 
        symbol: ".", 
        pattern: /^\.$/, 
        toToken: (word: string) =>`<dot>`
    },
    { 
        symbol: ",",
        pattern: /^,$/,  
        toToken: (word: string) =>`<comma>`},

    /**************************************************************************/
    { 
        symbol: "<",
        pattern: /^<$/, 
        toToken: (word: string) =>`<lChevron>`
    },

    {
        symbol: ">", 
        pattern: /^>$/, 
        toToken: (word: string) =>`<rChevron>`
    },
];

type Token = {
    symbol?: string;
    tokenRecognizer: TokenRecognizer;
    toToken: (word: string) => string;
};

export const tokens = tokenPatterns.map(
    (tp) => {
        const result: Token = {
            tokenRecognizer: (input: string) => tp.pattern.test(input),
            toToken: (input: string) => tp.toToken(input)
        }
        if(tp.symbol){
            result.symbol = tp.symbol;
        }
        return result;
    }
);
