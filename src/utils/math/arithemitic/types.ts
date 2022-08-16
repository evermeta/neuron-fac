import { DataPoint } from "../statistics/data-point-class";

export interface Shape {
    isInside(dataPoint: DataPoint): boolean;
}

export class AbstractShape implements Shape {
    public isInside: (dataPoint: DataPoint) => boolean;

    constructor(isInside: (dataPoint: DataPoint) => boolean) {
        this.isInside = isInside;
    }
}

export class Rectangle extends AbstractShape {
    constructor(x: number, y: number, width: number, height: number) {
        const isInside = (dataPoint: DataPoint) => {
            return (
                (dataPoint.value["x"] as number) >= x &&
                (dataPoint.value["x"] as number) <= x + width &&
                (dataPoint.value["y"] as number) >= y &&
                (dataPoint.value["y"] as number) <= y + height
            );
        };
        super(isInside);
    }
}

export class Circle extends AbstractShape {
    constructor(x: number, y: number, radius: number) {
        const isInside = (dataPoint: DataPoint) => {
            return (
                Math.sqrt(
                    Math.pow((dataPoint.value["x"] as number) - x, 2) +
                        Math.pow((dataPoint.value["y"] as number) - y, 2)
                ) <= radius
            );
        };
        super(isInside);
    }
}

export class Triangle extends AbstractShape {
    constructor(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number) {
        const isInside = (dataPoint: DataPoint) => {
            return (
                (dataPoint.value["x"] as number) >= Math.min(x1, x2, x3) &&
                (dataPoint.value["x"] as number) <= Math.max(x1, x2, x3) &&
                (dataPoint.value["y"] as number) >= Math.min(y1, y2, y3) &&
                (dataPoint.value["y"] as number) <= Math.max(y1, y2, y3)
            );
        };
        super(isInside);
    }
}
