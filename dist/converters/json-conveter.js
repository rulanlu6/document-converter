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
exports.JSONConverter = void 0;
const base_converter_1 = require("./base-converter");
class JSONConverter extends base_converter_1.BaseConverter {
    // Method to convert JSON to String
    convertJSONToString(input) {
        return __awaiter(this, void 0, void 0, function* () {
            // Placeholder logic for converting JSON to String
            return `json to string`;
        });
    }
    // Method to convert JSON to XML
    convertJSONToXML(input) {
        return __awaiter(this, void 0, void 0, function* () {
            // Placeholder logic for converting JSON to XML
            return `json to xml`;
        });
    }
    // Main conversion method, uses the appropriate method based on the 'to' type
    convert(input, to, lineSeparator, elementSeparator) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (to) {
                case "string":
                    return this.convertJSONToString(input); // Call the string conversion method
                case "xml":
                    return this.convertJSONToXML(input); // Call the XML conversion method
                default:
                    throw new Error(`Conversion from JSON to ${to} is not supported.`);
            }
        });
    }
}
exports.JSONConverter = JSONConverter;
