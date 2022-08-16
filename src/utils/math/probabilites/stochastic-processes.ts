import { DataPoint } from "../statistics/data-point-class";

export type StochasticProcessType = {
    dataPoints: DataPoint[];
    newDataPoint: () => DataPoint;
    inFunction: (point: DataPoint) => boolean;
};

export class StochasticProcess implements StochasticProcessType {
    readonly dataPoints: DataPoint[];
    public newDataPoint: () => DataPoint;
    public inFunction: (point: DataPoint) => boolean;

    constructor(
        newDataPoint: () => DataPoint,
        inFunction: (point: DataPoint) => boolean
    ) {
        this.dataPoints = [];
        this.newDataPoint = newDataPoint;
        this.inFunction = inFunction;
    }

    execute(size: number): number {
        while (this.dataPoints.length < size) {
            this.dataPoints.push(this.newDataPoint());
        }
        const result = this.dataPoints.map((dp) => this.inFunction(dp)).filter((x) => x === true);
        return result.length / this.dataPoints.length;  
    }
}
