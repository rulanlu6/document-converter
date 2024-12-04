"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSONConverter = void 0;
const base_converter_1 = require("./base-converter");
const objectToString_1 = require("./helpers/objectToString");
const xml2js_1 = __importDefault(require("xml2js"));
class JSONConverter extends base_converter_1.BaseConverter {
    // Method to convert JSON to String
    async convertJSONToString(input, lineSeparator, elementSeparator) {
        try {
            const data = JSON.parse(input.buffer.toString("utf8"));
            let string = (0, objectToString_1.objectToString)(data, lineSeparator, elementSeparator);
            return string;
        }
        catch (err) {
            console.error("Error converting JSON to String:", err);
            throw new Error("Error converting JSON to String");
        }
    }
    // Method to convert JSON to XML
    async convertJSONToXML(input) {
        try {
            const data = JSON.parse(input.buffer.toString("utf8"));
            const builder = new xml2js_1.default.Builder();
            let xml = builder.buildObject(data);
            xml = xml.replace(/standalone="yes"/, "");
            return xml;
        }
        catch (err) {
            console.error("Error converting JSON to XML:", err);
            throw new Error("Error converting JSON to XML");
        }
    }
    // Main conversion method, uses the appropriate method based on the 'to' type
    async convert(input, to, lineSeparator, elementSeparator) {
        switch (to) {
            case "text/plain":
                return this.convertJSONToString(input, lineSeparator, elementSeparator);
            case "application/xml":
                return this.convertJSONToXML(input);
            default:
                const error = new Error(`Conversion from String to ${to} is not supported.`);
                error.name = "UnsupportedConversion";
                throw error;
        }
    }
}
exports.JSONConverter = JSONConverter;
