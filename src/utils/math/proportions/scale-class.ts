export interface ScaleType {
    min: number;
    max: number;
}

export class Scale implements ScaleType {
    public min: number;
    public max: number;
    public readonly normalizedToZero: ScaleType;

    constructor(min: number, max: number) {
        this.min = min;
        this.max = max;
        this.normalizedToZero = { min: 0, max: max - min };
    }
    scaleValue(value: number, valueScale: Scale): number {
        return (
            ((value - valueScale.min) / (valueScale.max - valueScale.min)) *
                (this.max - this.min) +
            this.min
        );
    }
}
