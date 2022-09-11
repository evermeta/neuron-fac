import { MatrixType } from "./types";
/******************************************************************************/


export class Matrix implements MatrixType {
    public numberOfColumns = 0;
    public numberOfRows =0;
    public values: number[][] = [];

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
            this.values = options.values;
            return; 
        }
        if(options.rows && options.columns){
            this.numberOfRows = options.rows;
            this.numberOfColumns = options.columns;
            this.values = Array.from({length: options.rows}, () => Array(options.columns).fill(0));
            return;
        } 

    }
}

export const trace = (matrix: Matrix): number => {
    if(matrix.numberOfRows !== matrix.numberOfColumns){
        throw new Error("Matrix must be square");
    }
    return matrix.values.reduce((acc, val, i) => acc + val[i], 0);
} ;


export const transpose = (matrix: Matrix): Matrix => {
    const newMatrix = new Matrix({
        rows: matrix.numberOfColumns,
        columns: matrix.numberOfRows
    });
    for(let i = 0; i < matrix.numberOfRows; i++){
        for(let j = 0; j < matrix.numberOfColumns; j++){
            newMatrix.values[j][i] = matrix.values[i][j];
        }
    }
    return newMatrix;
}

