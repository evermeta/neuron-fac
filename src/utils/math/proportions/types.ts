import { Scale } from "./scale-class";

export interface ProportionType {
    value: number;
    normalized: number;
}

const PERCENT_SCALE = new Scale(0, 100);
Object.freeze(PERCENT_SCALE);

export class Percentage implements ProportionType {
    private scale: Scale;
    public value: number;
    public normalized: number;

    constructor(value: number, scale: Scale = PERCENT_SCALE) {
        this.value = value;
        this.scale = scale;
        this.normalized = PERCENT_SCALE.scaleValue(this.value, this.scale);
        if (this.normalized > 100 || this.normalized < 0)
            throw "bad value for percentage";
    }

    get asDecimal(): number {
        return this.normalized / 100;
    }

    differential(tInitial: number, iterationNumber: number): number {
        // calculate xt = x(t) where x(t) is the normalized percentage
        let t = tInitial;

        for (let i = 0; i < iterationNumber; i++) {
            t = this.asDecimal * t;
        }
        return t;
    }
}
