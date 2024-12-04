"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XMLConverter = void 0;
const base_converter_1 = require("./base-converter");
const xmlToObject_1 = require("./helpers/xmlToObject");
const objectToString_1 = require("./helpers/objectToString");
const wrapObjectInArray_1 = require("./helpers/wrapObjectInArray");
const xml2js_1 = require("xml2js");
class XMLConverter extends base_converter_1.BaseConverter {
    // Method to convert XML to String
    async convertXMLToString(input, lineSeparator, elementSeparator) {
        try {
            const data = input.buffer.toString("utf8");
            const object = (0, xmlToObject_1.xmlToObject)(data);
            const string = (0, objectToString_1.objectToString)(object, lineSeparator, elementSeparator);
            return string;
        }
        catch (err) {
            console.error("Error converting XML to String:", err);
            throw new Error("Invalid XML format");
        }
    }
    // Method to convert XML to JSON
    async convertXMLToJSON(input) {
        try {
            const xml = input.buffer.toString("utf-8");
            const object = await (0, xml2js_1.parseStringPromise)(xml, {
                explicitArray: false,
            });
            const root = Object.keys(object)[0]; // Remove the root tag
            let result = (0, wrapObjectInArray_1.wrapObjectInArray)(object[root]);
            return JSON.stringify(result, null, 2);
        }
        catch (error) {
            console.error("Error converting XML to JSON:", error);
            throw new Error("Invalid XML format");
        }
    }
    // Main conversion method, uses the appropriate method based on the 'to' type
    async convert(input, to, lineSeparator, elementSeparator) {
        switch (to) {
            case "text/plain":
                return this.convertXMLToString(input, lineSeparator, elementSeparator); // Call the string conversion method
            case "application/json":
                return this.convertXMLToJSON(input); // Call the JSON conversion method
            default:
                throw new Error(`Conversion from XML to ${to} is not supported.`);
        }
    }
}
exports.XMLConverter = XMLConverter;
