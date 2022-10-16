/******************************************************************************
 * The parenthesis function returns an array of strings, each string is a
 * sub-block of the input string that is enclosed in parenthesis.
 *****************************************************************************/
export type BinaryEncloser = {
    open: string;
    close: string;
}

export const parenthesisEncloser = {
    open: "(",
    close: ")"
};

export const binaryEncloserSplit = (
    expression: string, 
    encloser: BinaryEncloser = parenthesisEncloser 
    ): string[] => {

    if(!expression.includes(encloser.open)) return [expression];

    const result:string[] = [];
    let current = "";
    let parenthesisLevel = 0;
    const addCurrent = () => {
        if(current.trim().length > 0) result.push(current.trim());
        current = "";
    };
    for(let i = 0; i < expression.length; i++) {
        const char = expression[i];
        if(char === encloser.open) {
            if(parenthesisLevel === 0) addCurrent(); 
            parenthesisLevel++;
            if(parenthesisLevel === 1) continue;
        }
        if(char === encloser.close) {
            parenthesisLevel--;
            if(parenthesisLevel === 0) {
                addCurrent(); 
                continue;
            }
        }
        current += char;
    }
    return result;
}
