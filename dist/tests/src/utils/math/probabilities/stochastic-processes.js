"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const stochastic_processes_1 = require("../../../../../src/utils/math/probabilites/stochastic-processes");
const data_point_class_1 = require("../../../../../src/utils/math/statistics/data-point-class");
describe("StochasticProcess class", () => {
    it("It can approximate pi with error +/- 0.15 with 400 dtpoints", () => {
        const newDataPoint = () => {
            return new data_point_class_1.DataPoint({
                x: Math.random(),
                y: Math.random(),
            });
        };
        const inFunction = (point) => {
            const square = (x) => x * x;
            return (Math.sqrt(square(point.value["x"]) +
                square(point.value["y"])) <= 1);
        };
        const res = new stochastic_processes_1.StochasticProcess(newDataPoint, inFunction).execute(500);
        (0, chai_1.expect)(res * 4).to.be.lessThan(Math.PI + 0.15);
        (0, chai_1.expect)(res * 4).to.be.greaterThan(Math.PI - 0.15);
    });
});
