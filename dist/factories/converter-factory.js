"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConverterFactory = void 0;
const string_converter_1 = require("../converters/string-converter");
const json_conveter_1 = require("../converters/json-conveter");
const xml_conveter_1 = require("../converters/xml-conveter");
class ConverterFactory {
    // General conversion method
    async getConverter(input, from, to, lineSeparator, elementSeparator) {
        let converter;
        // Determine which class to instantiate based on 'from' type
        switch (from) {
            case "text/plain":
                converter = new string_converter_1.StringConverter();
                break;
            case "application/json":
                converter = new json_conveter_1.JSONConverter();
                break;
            case "application/xml":
            case "text/xml":
                converter = new xml_conveter_1.XMLConverter();
                break;
            // More cases can be added for other format conversions
            default:
                throw new Error(`Conversion from ${from} to ${to} is not supported.`);
        }
        return converter.convert(input, to, lineSeparator, elementSeparator);
    }
}
exports.ConverterFactory = ConverterFactory;
