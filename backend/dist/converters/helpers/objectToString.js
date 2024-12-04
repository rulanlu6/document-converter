"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectToString = void 0;
const objectToString = (object, lineSeparator, elementSeparator) => {
    const lines = [];
    for (const [key, value] of Object.entries(object)) {
        // If the value is an array, process each object inside it as a line
        if (Array.isArray(value)) {
            value.forEach((item) => {
                if (typeof item === "object" && item !== null) {
                    const elements = Object.values(item).join(elementSeparator);
                    lines.push(`${key}${elementSeparator}${elements}`);
                }
            });
        }
    }
    return lines.join(lineSeparator);
};
exports.objectToString = objectToString;
