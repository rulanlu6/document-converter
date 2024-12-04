"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectToXML = void 0;
const objectToXML = (object, depth = 0, rootKey = "") => {
    const indent = "  ".repeat(depth); // Two spaces per depth level
    if (Array.isArray(object)) {
        return object
            .map((value) => {
            return `${indent}<${rootKey}>\n${(0, exports.objectToXML)(value, depth + 1, rootKey)}\n${indent}</${rootKey}>`;
        })
            .join("\n");
    }
    if (typeof object === "object") {
        return Object.entries(object)
            .map(([key, value]) => {
            if (typeof value === "string") {
                return `${indent}<${key}>${value}</${key}>`;
            }
            else {
                return (0, exports.objectToXML)(value, depth, key);
            }
        })
            .join("\n");
    }
    return `${indent}${String(object)}`;
};
exports.objectToXML = objectToXML;
