"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConverterFactory = void 0;
const string_converter_1 = require("../converters/string-converter");
const json_conveter_1 = require("../converters/json-conveter");
const xml_conveter_1 = require("../converters/xml-conveter");
class ConverterFactory {
    converterMap = new Map();
    constructor() {
        // Map file types to converter classes
        this.converterMap.set("text/plain", string_converter_1.StringConverter);
        this.converterMap.set("application/json", json_conveter_1.JSONConverter);
        this.converterMap.set("application/xml", xml_conveter_1.XMLConverter);
        this.converterMap.set("text/xml", xml_conveter_1.XMLConverter);
    }
    async getConverter(input, from, to, lineSeparator, elementSeparator) {
        // Check if we have a converter for the given 'from' format
        const ConverterClass = this.converterMap.get(from);
        if (!ConverterClass) {
            throw new Error(`No converter found for format: ${from}`);
        }
        const converter = new ConverterClass();
        return converter.convert(input, to, lineSeparator, elementSeparator);
    }
}
exports.ConverterFactory = ConverterFactory;
