import { SetElement } from "../sets/types";

type DataPointValue = DataPoint | Record<string, unknown>;
const cpy = (obj: Record<string, unknown>): Record<string, unknown> =>
    JSON.parse(JSON.stringify(obj));

export class DataPoint implements SetElement {
    public value: Record<string, unknown>;

    constructor(data: DataPointValue) {
        this.value = cpy(data instanceof DataPoint ? data.value : data);
    }

    public isSame(x: DataPointValue): boolean {
        if (x instanceof DataPoint)
            return JSON.stringify(this.value) === JSON.stringify(x.value);
        return JSON.stringify(this.value) === JSON.stringify(x);
    }
}
