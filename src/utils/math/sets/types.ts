
export type ValueType = Record<string, unknown>; 

export type SetElement = {
    value: ValueType;  
    isSame: (e:SetElement | ValueType)=>boolean; 
}

export interface Set {
    includes: (e1: SetElement | ValueType)=>boolean; 
}