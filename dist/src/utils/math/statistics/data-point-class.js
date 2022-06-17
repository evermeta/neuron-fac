"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataPoint = void 0;
const cpy = (obj) => JSON.parse(JSON.stringify(obj));
class DataPoint {
    constructor(data) {
        this.value = cpy(data instanceof DataPoint ? data.value : data);
    }
    isSame(x) {
        if (x instanceof DataPoint)
            return JSON.stringify(this.value) === JSON.stringify(x.value);
        return JSON.stringify(this.value) === JSON.stringify(x);
    }
}
exports.DataPoint = DataPoint;
