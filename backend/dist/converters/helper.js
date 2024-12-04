"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.xmlToObject = exports.objectInsertSeparators = exports.wrapObjectInArray = exports.objectToXML = exports.stringToObject = void 0;
const stringToObject = (inputString, lineSeparator, elementSeparator) => {
    inputString = inputString.replace(/(\r\n|\n|\r)/gm, ""); // Remove line breaks
    const lines = inputString.split(lineSeparator);
    const result = {};
    lines.forEach((line) => {
        const parts = line
            .split(elementSeparator)
            .filter((line) => line.trim() !== "");
        const key = parts[0];
        const values = parts.slice(1);
        if (key) {
            // If the key doesn't exist in the result object, initialize it as an empty array
            if (!result[key]) {
                result[key] = [];
            }
            const obj = {};
            values.forEach((value, index) => {
                obj[`${key}${index + 1}`] = value;
            });
            result[key].push(obj);
        }
    });
    return result;
};
exports.stringToObject = stringToObject;
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
                return `${indent}<${key}>${value}</${key}>`; // If value is string, return it directly
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
const objectInsertSeparators = (object, lineSeparator, elementSeparator) => {
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
exports.objectInsertSeparators = objectInsertSeparators;
const xmlToObject = (xml) => {
    const startTag = "<root>";
    const endTag = "</root>";
    const startIndex = xml.indexOf(startTag) + startTag.length;
    const endIndex = xml.indexOf(endTag);
    // Extract the content between the <root> and </root> tags (including the tags)
    const content = xml.slice(startIndex, endIndex).replace(/[\r\n]+/g, "");
    let object = {};
    // Extract the main tag (key)
    const regex = /<(\w+)>\s*(.*?)\s*<\/\1>/gs;
    let match;
    while ((match = regex.exec(content)) !== null) {
        const mainTag = match[1];
        const subTagRegex = /<(\w+)>(.*?)<\/\1>/gs; // To match subtags (values)
        const subtags = {};
        let subMatch;
        while ((subMatch = subTagRegex.exec(match[2])) !== null) {
            const subTag = subMatch[1];
            const value = subMatch[2];
            subtags[subTag] = value;
        }
        // Handle if a key has multiple values
        if (object.hasOwnProperty(mainTag)) {
            object[mainTag].push(subtags);
        }
        else {
            object[mainTag] = [subtags];
        }
    }
    return object;
};
exports.xmlToObject = xmlToObject;
