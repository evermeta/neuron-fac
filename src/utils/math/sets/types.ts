export type ValueType = Record<string, unknown>;
export const copyValue = (value: ValueType) => JSON.parse(JSON.stringify(value));

export type SetElementType = {
    value: ValueType;
    isSame: (e: SetElement | ValueType) => boolean;
};

export class SetElement implements SetElementType {

    public value: ValueType; 

    constructor(value: ValueType) {
        this.value = copyValue(value);
    }

    public isSame(e: SetElement | ValueType): boolean {
        if (e instanceof SetElement)
            return JSON.stringify(this.value) === JSON.stringify(e.value);
        return JSON.stringify(this.value) === JSON.stringify(e);
    }
}

export interface Set {
    includes: (e1: SetElement | ValueType) => boolean;
}
