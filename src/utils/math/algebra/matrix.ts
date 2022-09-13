/******************************************************************************/
import { matrixProperties, MatrixProperties } from "./matrix-properties";
import { MatrixType, Vector } from "./types";
/******************************************************************************/

export const matrixErrors = {
    incompatibleDimensions : new Error("Matrices must have the same number of rows and columns"),
    nonSquareMatrix        : new Error("Matrix must be square"),
};

export const minorMatrix = (
    values: number[][], 
    row: number, 
    column: number): number[][]=> {

    return values
        .filter((_,i) => i !== row)
        .map((row) => row.filter((_, j) => j !== column));
}

export class Matrix implements MatrixType {

    public numberOfColumns  = 0;
    public numberOfRows     = 0;
    public values: number[][] = [];
    public readonly properties: MatrixProperties 


    constructor(
        options: {
            rows?: number; 
            columns?: number;
            values?: number[][]; 
        }
    ){ 
        if(options.values){
            this.numberOfRows = options.values.length;
            this.numberOfColumns = options.values[0].length;
            if(options.values.some(row => row.length !== this.numberOfColumns)){
                throw new Error("Invalid matrix dimensions");
            }
            this.values = options.values;
            this.properties = matrixProperties(this);
            return; 
        }
        if(options.rows && options.columns){
            this.numberOfRows = options.rows;
            this.numberOfColumns = options.columns;
            this.values = Array.from({length: options.rows}, () => Array(options.columns).fill(0));
            const square = options.rows === options.columns;
            this.properties = ({
                isSquare: square, 
                isSymmetric: square 
            });
            return;
        } 
        throw new Error("Invalid options");
    }
    

  

    determinant(): number{
        
        const _determinant = (): number => { 
            let determinant = 0;
            for(let i = 0; i < this.numberOfColumns; i++){
                determinant += this.values[0][i] * this.cofactor(0, i);
            }
            return determinant;
        }; 

        if(this.numberOfRows !== this.numberOfColumns){
            throw matrixErrors.nonSquareMatrix; 
        }
        return this.numberOfRows === 1 
            ? this.values[0][0]
            : _determinant();
    }

    cofactor(row: number, column: number): number{
        return Math.pow(-1, row + column) * this.minor(row, column);
    }

    minor(row: number, column: number): number{
        return (new Matrix({ values: minorMatrix(this.values, row, column) }))
            .determinant();
    }

    columnToVector(column: number): Vector<number>{
        return {
            values: this.values.map(row => row[column])
        };
    } 

    rowToVector(row: number): Vector<number>{
        return {
            values: this.values[row]
        };
    }

    equals(matrix: Matrix): boolean{
        if(this.numberOfRows !== matrix.numberOfRows || this.numberOfColumns !== matrix.numberOfColumns){
            return false;
        }
        return this.values.every((row, i) => row.every((value, j) => value === matrix.values[i][j]));
    }


}
