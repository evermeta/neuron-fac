import { expect } from "chai";
import { StochasticProcess } from "../../../../../src/utils/math/probabilites/stochastic-processes";
import { DataPoint } from "../../../../../src/utils/math/statistics/data-point-class";

describe("StochasticProcess class", () => {
    it("It can approximate pi with error +/- 0.15 with 400 dtpoints", () => {
        const newDataPoint = (): DataPoint => {
            return new DataPoint({
                x: Math.random(),
                y: Math.random(),
            });
        };
        const inFunction = (point: DataPoint) => {
            const square = (x: number) => x * x;
            return (
                Math.sqrt(
                    square(point.value["x"] as number) +
                        square(point.value["y"] as number)
                ) <= 1
            );
        };

        const res = new StochasticProcess(newDataPoint, inFunction).execute(500);
        expect(res * 4).to.be.lessThan(Math.PI + 0.15);
        expect(res * 4).to.be.greaterThan(Math.PI - 0.15);
    });
});
