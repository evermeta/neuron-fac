type Operator = '+' | '-' | '*' | '/'; 


type numberExpression = {
    value:number;
}

type binaryExpression = {
    operator: Operator;
    left: Expression;
    right: Expression;
}

export type Expression = null | numberExpression | binaryExpression;

const hasCharacter = (expression: string, character: string): boolean => {
    return expression.indexOf(character) > -1;
}

export const parseArithmeticExpression = (expression: string): Expression => {
    //remove all white spaces
    expression = expression.replace(/\s/g, '');

    if(Number.isInteger(Number(expression))) {
        return {
            value: Number(expression)
        };
    }

    if(expression.indexOf('+') > -1) {
        return {
            operator: '+',
            left: parseArithmeticExpression(expression.substring(0, expression.indexOf('+'))),
            right: parseArithmeticExpression(expression.substring(expression.indexOf('+') + 1))
        }; 
    }

    if(expression.indexOf('-') > -1) {
        return {
            operator: '-',
            left: parseArithmeticExpression(expression.substring(0, expression.indexOf('-'))),
            right: parseArithmeticExpression(expression.substring(expression.indexOf('-') + 1))
        }; 
    }

    if(expression.indexOf('*') > -1) {
        return {
            operator: '*',
            left: parseArithmeticExpression(expression.substring(0, expression.indexOf('*'))),
            right: parseArithmeticExpression(expression.substring(expression.indexOf('*') + 1))
        }; 
    }

    if(expression.indexOf('/') > -1) {
        return {
            operator: '*',
            left: parseArithmeticExpression(expression.substring(0, expression.indexOf('/'))),
            right: parseArithmeticExpression(expression.substring(expression.indexOf('/') + 1))
        }; 
    }


    return null;

}