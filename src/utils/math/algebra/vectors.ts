import { Vector } from "./types";

const thresholdEqual = 0.0000000000000001;

export const norm = (a: Vector<number>): number => {
    const values = a.values as number[];
    return Math.sqrt(values.reduce((acc, x) => acc + x * x, 0));
}; 

export const dotProduct = (a: Vector<number>, b: Vector<number>): number =>{
    if(a.values.length !== b.values.length){
        throw new Error("Vectors must have the same length");
    }
    const valuesA = a.values as number[];
    const valuesB = b.values as number[];
    return valuesA.reduce((acc, x, i) => acc + x * valuesB[i], 0);
}; 

export const areOrthogonalVectors = (vectors: Vector<number>[]): boolean => {
    const standardDimension = vectors[0].values.length;
    if(vectors.some(v => v.values.length !== standardDimension)){
        throw new Error("Vectors must have the same length");
    }
    for(let i = 0; i < vectors.length; i++){
        for(let j = i + 1; j < vectors.length; j++){
            if(dotProduct(vectors[i], vectors[j]) > thresholdEqual){
                return false;
            }
        }
    }
    return true;
}
