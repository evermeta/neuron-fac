import { SetElement, ValueType } from "../sets/types";
import { DataSetType } from "../types";
import { DataPoint } from "./data-point-class";

export class DataSet implements DataSetType {
    public readonly data: DataPoint[];
    constructor(initialData: DataPoint[] = []) {
        this.data = initialData.map((p) => new DataPoint(p.value));
    }
    includes(point: SetElement | ValueType) {
        return this.data.some((dp) => dp.isSame(point));
    }
}
