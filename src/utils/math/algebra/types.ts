export interface MatrixType {
    numberOfRows: number;
    numberOfColumns: number;
}

export interface AlgebraicGroup<T> {
    operation: (a: T, b: T) => T;
    inverse: (a: T) => T;
    identity: T;
}

export interface MultiplicativeGroup<T> extends AlgebraicGroup<T> {
    multiply: (a: T, b: T) => T;
}

export interface AdditiveGroup<T> extends AlgebraicGroup<T> {
    add: (a: T, b: T) => T;
}

export interface AlgebraicField<T> extends AdditiveGroup<T>, MultiplicativeGroup<T> {
    isZero: (a: T) => boolean;
    isOne: (a: T) => boolean;
    divide: (a: T, b: T) => T;
    negate: (a: T) => T;
}


export type Vector<T>  = {
    values: T[] | Record<string, T>; 
} 

export interface VectorSpace<T> {
    field: AlgebraicField<T>;
    scale: (a: T, b: Vector<T>) => Vector<T>;
}
