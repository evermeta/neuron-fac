import { Set, ValueType } from "./sets/types";
import { DataPoint } from "./statistics/data-point-class";

export interface DataSetBin {
    includes: (x: DataPoint | ValueType) => boolean;
}

export interface DataSetType extends Set {
    readonly data: DataPoint[];
}

/*export class Histogram {
    private dataSet: DataSet; 
}*/

export class Probability {
    public value: number;

    constructor(value: number) {
        if (value > 1 || value < 0) throw "bad value for probability";
        this.value = value;
    }
}
