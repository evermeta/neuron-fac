"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.frequency = void 0;
const frequency = (dataBin, dataSet) => {
    let counter = 0;
    dataSet.data.forEach((dataPoint) => {
        if (dataBin.includes(dataPoint))
            counter++;
    });
    return counter;
};
exports.frequency = frequency;
