"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapObjectInArray = void 0;
const wrapObjectInArray = (obj) => {
    // Iterate over each top-level key in the object
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            // If the value is not already an array, wrap it in an array
            if (!Array.isArray(value)) {
                obj[key] = [value];
            }
        }
    }
    return obj;
};
exports.wrapObjectInArray = wrapObjectInArray;
