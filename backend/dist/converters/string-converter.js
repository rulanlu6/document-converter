"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringConverter = void 0;
const base_converter_1 = require("./base-converter");
const stringToObject_1 = require("./helpers/stringToObject");
const objectToXML_1 = require("./helpers/objectToXML");
class StringConverter extends base_converter_1.BaseConverter {
    // Method to convert String to JSON
    async convertStringToJSON(input, lineSeparator, elementSeparator) {
        try {
            const data = input.buffer.toString("utf8");
            const object = (0, stringToObject_1.stringToObject)(data, lineSeparator, elementSeparator);
            const json = JSON.stringify(object, null, 2);
            return json;
        }
        catch (err) {
            console.error("Error converting string to JSON:", err);
            throw new Error("Error converting string to JSON");
        }
    }
    // Method to convert String to XML
    async convertStringToXML(input, lineSeparator, elementSeparator) {
        try {
            const data = input.buffer.toString("utf8");
            const object = (0, stringToObject_1.stringToObject)(data, lineSeparator, elementSeparator);
            const xml = `<?xml version="1.0" encoding="UTF-8" ?>\n<root>\n${(0, objectToXML_1.objectToXML)(object, 1)}\n</root>`;
            return xml;
        }
        catch (err) {
            console.error("Error converting string to XML:", err);
            throw new Error("Error converting string to XML");
        }
    }
    // Main conversion method, uses the appropriate method based on the 'to' type
    async convert(input, to, lineSeparator, elementSeparator) {
        switch (to) {
            case "application/json":
                return this.convertStringToJSON(input, lineSeparator, elementSeparator);
            case "application/xml":
                return this.convertStringToXML(input, lineSeparator, elementSeparator);
            default:
                const error = new Error(`Conversion from String to ${to} is not supported.`);
                error.name = "UnsupportedConversion";
                throw error;
        }
    }
}
exports.StringConverter = StringConverter;
