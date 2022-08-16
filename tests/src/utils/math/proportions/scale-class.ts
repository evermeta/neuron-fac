import { expect } from "chai";
import { Scale } from "../../../../../src/utils/math/proportions/scale-class";

describe("Scale class", () => {
    it("Represents a linear scale", () => {
        const scale = new Scale(0, 100);
        expect(scale.min).to.equal(0);
        expect(scale.max).to.equal(100);
    });

    it("Stores a normalized version that begins at 0", () => {
        const scale = new Scale(-20, 90);
        expect(scale.normalizedToZero.min).to.equal(0);
        expect(scale.normalizedToZero.max).to.equal(110);
    });
    it("Stores a normalized version that begins at zero", () => {
        const scale = new Scale(20, 100);
        expect(scale.normalizedToZero.min).to.equal(0);
        expect(scale.normalizedToZero.max).to.equal(80);
    });

    it("Can scale a value on a different scale according to itself", () => {
        const scale = new Scale(0, 100);
        const scaleTwo = new Scale(0, 200);
        expect(scale.scaleValue(100, scaleTwo)).to.equal(50);
    });

    it("Can scale a value on a different scale according to itself", () => {
        const scale = new Scale(0, 50);
        const scaleTwo = new Scale(0, 100);
        expect(scale.scaleValue(50, scaleTwo)).to.equal(25);
    });

    it("Can scale a value on a different scale according to itself", () => {
        const scale = new Scale(-50, 50);
        const scaleTwo = new Scale(0, 200);
        expect(scale.scaleValue(50, scaleTwo)).to.equal(-25);
    });
});
