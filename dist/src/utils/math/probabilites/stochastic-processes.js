"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StochasticProcess = void 0;
class StochasticProcess {
    constructor(newDataPoint, inFunction) {
        this.dataPoints = [];
        this.newDataPoint = newDataPoint;
        this.inFunction = inFunction;
    }
    execute(size) {
        while (this.dataPoints.length < size) {
            this.dataPoints.push(this.newDataPoint());
        }
        const result = this.dataPoints.map((dp) => this.inFunction(dp)).filter((x) => x === true);
        return result.length / this.dataPoints.length;
    }
}
exports.StochasticProcess = StochasticProcess;
