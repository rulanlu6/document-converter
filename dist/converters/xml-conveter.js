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
            // Placeholder logic for converting XML to JSON
            return `xml to json`;
        });
    }
    // Main conversion method, uses the appropriate method based on the 'to' type
    convert(input, to, lineSeparator, elementSeparator) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (to) {
                case "string":
                    return this.convertXMLToString(input); // Call the string conversion method
                case "json":
                    return this.convertXMLToJSON(input); // Call the JSON conversion method
                default:
                    throw new Error(`Conversion from XML to ${to} is not supported.`);
            }
        });
    }
}
exports.XMLConverter = XMLConverter;
