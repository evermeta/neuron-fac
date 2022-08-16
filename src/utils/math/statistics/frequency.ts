import { DataSetBin } from "../types";
import { DataSet } from "./data-set-class";

export const frequency = (dataBin: DataSetBin, dataSet: DataSet): number => {
    let counter = 0;
    dataSet.data.forEach((dataPoint) => {
        if (dataBin.includes(dataPoint)) counter++;
    });
    return counter;
};
