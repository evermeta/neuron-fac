"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const data_point_class_1 = require("../../../../../src/utils/math/statistics/data-point-class");
describe("DataPoint class", () => {
    const ptValue = { x: 4, y: 3 };
    const pt = new data_point_class_1.DataPoint(ptValue);
    it("it is a container for data point values", () => {
        (0, chai_1.expect)(pt.value["x"]).to.eq(4);
        (0, chai_1.expect)(pt.value["y"]).to.eq(3);
    });
    it("it keeps a copy of the value with which it is initialized, but not the object itself", () => {
        (0, chai_1.expect)(pt.value === ptValue).to.be.false;
        (0, chai_1.expect)(pt.value).to.eql(ptValue);
        (0, chai_1.expect)(pt.isSame(ptValue)).to.be.true;
    });
    it("can recognize if another value is the same as it", () => {
        (0, chai_1.expect)(pt.isSame(ptValue)).to.be.true;
        (0, chai_1.expect)(pt.isSame(new data_point_class_1.DataPoint(ptValue))).to.be.true;
    });
});
