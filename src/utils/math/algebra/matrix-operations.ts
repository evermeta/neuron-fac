/******************************************************************************/
import { Matrix, matrixErrors } from "./matrix";
/******************************************************************************/

export const matrixProduct = (a: Matrix, b: Matrix): Matrix => {
    if(a.numberOfColumns !== b.numberOfRows){
        throw new Error("Invalid matrix dimensions");
    }
    const result = new Matrix({
        rows    : a.numberOfRows, 
        columns : b.numberOfColumns
    });

    for(let i = 0; i < a.numberOfRows; i++){
        for(let j = 0; j < b.numberOfColumns; j++){
            let sum = 0;
            for(let k = 0; k < a.numberOfColumns; k++){
                sum += a.values[i][k] * b.values[k][j];
            }
            result.values[i][j] = sum;
        }
    }
    return result;
};

//The trace of a matrix is the sum of the diagonal elements of 
//a square matrix 
export const trace = (matrix: Matrix): number => {
    if(matrix.numberOfRows !== matrix.numberOfColumns){
        throw matrixErrors.nonSquareMatrix; 
    }
    return matrix.values.reduce((acc, val, i) => acc + val[i], 0);
};

//The transpose of a matrix flips a matrix over its diagonal, 
//producing another matrix denoted as A^T
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
}; 

