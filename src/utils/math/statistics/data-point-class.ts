import { SetElement, ValueType } from "../sets/types";

export class DataPoint extends SetElement {

    constructor(data: ValueType) {
        super(data);
    }

    getProperty(propertyName: string): unknown {
        if (this.value[propertyName] === undefined) throw "Invalid property name";
        return this.value[propertyName];
    }
}
