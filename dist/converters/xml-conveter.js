"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.XMLConverter = void 0;
const base_converter_1 = require("./base-converter");
const helper_1 = require("./helper");
const xml2js_1 = require("xml2js");
class XMLConverter extends base_converter_1.BaseConverter {
    // Method to convert XML to String
    convertXMLToString(input) {
        return __awaiter(this, void 0, void 0, function* () {
            // Placeholder logic for converting XML to String
            return `xml to string`;
        });
    }
    // Method to convert XML to JSON
    convertXMLToJSON(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const xml = input.buffer.toString("utf-8");
                const object = yield (0, xml2js_1.parseStringPromise)(xml, {
                    explicitArray: false,
                });
                const root = Object.keys(object)[0]; // Don't include root tag
                let json = (0, helper_1.wrapObjectInArray)(object[root]);
                return JSON.stringify(json, null, 2);
            }
            catch (error) {
                console.error("Error converting XML to JSON:", error);
                throw new Error("Invalid XML format");
            }
        });
    }
    // Main conversion method, uses the appropriate method based on the 'to' type
    convert(input, to, lineSeparator, elementSeparator) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (to) {
                case "text/plain":
                    return this.convertXMLToString(input); // Call the string conversion method
                case "application/json":
                    return this.convertXMLToJSON(input); // Call the JSON conversion method
                default:
                    throw new Error(`Conversion from XML to ${to} is not supported.`);
            }
        });
    }
}
exports.XMLConverter = XMLConverter;
