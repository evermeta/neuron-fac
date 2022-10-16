import { expect } from "chai";
import { parseArithmeticExpression } from "../../../../../src/utils/math/algebra/text";

describe('parseArithmeticExpression parser', () => { 

    it('Parses sums into arithmetic expressions', () => {

/*        expect(parseArithmeticExpression('(4+5)-4')).to.eql({
            operator: '-',
            left: {
                operator: '+',
                left    : { value: 4 },
                right   : { value: 5 }
            },
            right: { value: 4 }
        });*/
        expect(parseArithmeticExpression('4+9-4')).to.eql({
            operator: '+',
            left: { value: 4 },
            right: { operator: '-', left: { value: 9 }, right: { value: 4 } }
        });
        expect(parseArithmeticExpression('4+9')).to.eql({
            operator: '+', left: { value: 4 }, right: { value: 9 }
        });
    });

    it('Parses substractions into arithmetic expressions', () => {
        expect(parseArithmeticExpression(' 4 - 5 ')).to.eql({
            operator: '-', left: { value: 4 }, right: { value: 5 }
        });
    });
}); 