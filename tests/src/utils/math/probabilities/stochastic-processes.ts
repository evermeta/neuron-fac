import { expect } from "chai";
import { StochasticProcess } from "../../../../../src/utils/math/probabilites/stochastic-processes";
import { DataPoint } from "../../../../../src/utils/math/statistics/data-point-class";
import { newRandomDataPointFunction } from "../../../../../src/utils/math/probabilites/types";

const square = (x: number) => x * x;
const radius = (x: number, y: number) => Math.sqrt(square(x) + square(y));

const errorMargin = 0.2;
const generateFromZeroToOne = (rand01: number) => rand01; 
const randomDataPointFunction = newRandomDataPointFunction({ 
    x: { generate: generateFromZeroToOne, type: "number" }, 
    y: { generate: generateFromZeroToOne, type: "number" }});

const generateFromZeroToPi = (rand01: number) => rand01 * Math.PI;
const randomDataPointFunction2 = newRandomDataPointFunction({
    x: { generate: generateFromZeroToOne, type: "number" },
    y: { generate: generateFromZeroToOne, type: "number" }
}); 
/*
describe("StochasticProcess class", () => {
    const piDataPointsNumber = 600;

   it(`It approximates pi within +/-${errorMargin} with about ${piDataPointsNumber} random dtpoints`, () => {
        const inFunction = (point: DataPoint) =>
            radius(point.getProperty("x") as number, point.getProperty("y") as number) <= 1;

        const res = new StochasticProcess(randomDataPointFunction, inFunction).execute(
            piDataPointsNumber
        );
        expect(res * 4).to.be.lessThan(Math.PI + errorMargin);
        expect(res * 4).to.be.greaterThan(Math.PI - errorMargin);
    });

    it(`It approximates a simple integral such as integral(y=x^2) over [0,1] within +-${errorMargin} with about 440 random data points`, () => {
        const inFunction = (point: DataPoint) =>
            (point.getProperty("y") as number) <= square(point.getProperty("x") as number);
        const res = new StochasticProcess(randomDataPointFunction, inFunction).execute(
            440
        );
        expect(res).to.be.lessThan(0.333 + errorMargin);
        expect(res).to.be.greaterThan(0.333 - errorMargin);
    });

    it(`It can be used to approximate integral(sin(x)dx) over [0,pi] within +-${errorMargin} with about 440 random data points`, () => {
        const inFunction = (point: DataPoint) =>
            (point.getProperty("y") as number) <= Math.sin(point.getProperty("x") as number);
        const res = new StochasticProcess(randomDataPointFunction2, inFunction)
            .execute( 600 );
        expect(res).to.be.lessThan(0.46 + errorMargin);
        expect(res).to.be.greaterThan(0.46 - errorMargin);
    });
});
*/