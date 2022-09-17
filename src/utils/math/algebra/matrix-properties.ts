/******************************************************************************/
import { Matrix } from "./matrix";
import { transpose } from "./matrix-operations";
/******************************************************************************/

export type MatrixProperties = {
    isSquare: boolean;
    isSymmetric: boolean;
}

const _isSquare = (matrix: Matrix): boolean =>{
    return matrix.numberOfRows === matrix.numberOfColumns;
}

const _isSymmetric = (matrix: Matrix): boolean => {
    const transposed = transpose(matrix);
    return matrix.equals(transposed);
}

export const matrixProperties=(matrix: Matrix): MatrixProperties => ({
    isSquare    : _isSquare(matrix),
    isSymmetric : _isSymmetric(matrix),
}); 
