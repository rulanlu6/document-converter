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
exports.StringConverter = void 0;
const base_converter_1 = require("./base-converter");
const helper_1 = require("./helper");
class StringConverter extends base_converter_1.BaseConverter {
    // Method to convert String to JSON
    convertStringToJSON(input, lineSeparator, elementSeparator) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = input.buffer.toString("utf8");
                const object = (0, helper_1.stringToObject)(data, lineSeparator, elementSeparator);
                const json = JSON.stringify(object, null, 2);
                return json;
            }
            catch (err) {
                console.error("Error converting string to JSON:", err);
                throw new Error("Invalid string format");
            }
        });
    }
    // Method to convert String to XML
    convertStringToXML(input, lineSeparator, elementSeparator) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = input.buffer.toString("utf8");
                const object = (0, helper_1.stringToObject)(data, lineSeparator, elementSeparator);
                const xml = `<root>\n${(0, helper_1.objectToXML)(object, 1)}\n</root>`;
                return xml;
            }
            catch (err) {
                console.error("Error converting string to XML:", err);
                throw new Error("Invalid string format");
            }
        });
    }
    // Main conversion method, uses the appropriate method based on the 'to' type
    convert(input, to, lineSeparator, elementSeparator) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (to) {
                case "application/json":
                    return this.convertStringToJSON(input, lineSeparator, elementSeparator); // Call the JSON conversion method
                case "application/xml":
                    return this.convertStringToXML(input, lineSeparator, elementSeparator); // Call the XML conversion method
                default:
                    throw new Error(`Conversion from String to ${to} is not supported.`);
            }
        });
    }
}
exports.StringConverter = StringConverter;
