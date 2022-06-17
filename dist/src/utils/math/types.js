"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Percentage = exports.Probability = exports.DataSet = void 0;
const data_point_class_1 = require("./statistics/data-point-class");
class DataSet {
    constructor(initialData = []) {
        this.data = initialData.map((p) => new data_point_class_1.DataPoint(p));
    }
    includes(point) {
        return this.data.some((dp) => dp.isSame(point));
    }
}
exports.DataSet = DataSet;
/*export class Histogram {
    private dataSet: DataSet;
}*/
class Probability {
    constructor(value) {
        if (value > 1 || value < 0)
            throw "bad value for probability";
        this.value = value;
    }
}
exports.Probability = Probability;
class Percentage {
    constructor(value) {
        if (value > 100 || value < 0)
            throw "bad value for percentage";
        this.value = value;
    }
}
exports.Percentage = Percentage;
