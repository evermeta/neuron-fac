"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.context = void 0;
const context = (contextName) => {
    let names, generateIndex;
    names = new Map();
    generateIndex = function () {
        if (typeof generateIndex.counter == "undefined") {
            generateIndex.counter = 0;
        }
        return ++generateIndex.counter;
    };
    return {
        name: function (objectName) {
            //returns the index of objectName in the name store
            expect(objectName).to.be.a("string");
            if (names.has(objectName)) {
                return names.get(objectName).ID;
            }
            else {
                newID = generateIndex();
                names.set(objectName, { ID: newID });
                return newID;
            }
        },
    };
};
exports.context = context;
