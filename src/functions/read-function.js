"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFunction = void 0;
const readFunction = (objFunction) => {
    if (objFunction.returnType === "boolean") {
        return new Function('a', 'b', `return ${objFunction.funcBody}`);
    }
    throw 'error';
};
exports.readFunction = readFunction;
