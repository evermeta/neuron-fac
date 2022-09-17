import { expect } from "chai";
import { Scale } from "../../../../../src/utils/math/proportions/scale-class";
import { Percentage } from "../../../../../src/utils/math/proportions/types";

describe("Percentage class", () => {
    it("Abstracts a percentage value", () => {
        const percent = new Percentage(50);
        expect(percent.value).to.equal(50);
        expect(percent.normalized).to.equal(50);
    });
    it("Is able to calculate a percentage value from a scale", () => {
        const percent = new Percentage(50, new Scale(0, 200));
        expect(percent.value).to.equal(50);
        expect(percent.normalized).to.equal(25);
    });
    it("Can also be calculated using a shifting scale", () => {
        const percent = new Percentage(50, new Scale(-50, 50));
        expect(percent.value).to.equal(50);
        expect(percent.normalized).to.equal(100);
    });
});
