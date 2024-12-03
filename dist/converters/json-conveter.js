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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSONConverter = void 0;
const base_converter_1 = require("./base-converter");
const xml2js_1 = __importDefault(require("xml2js"));
class JSONConverter extends base_converter_1.BaseConverter {
    // Method to convert JSON to String
    convertJSONToString(input, lineSeparator, elementSeparator) {
        return __awaiter(this, void 0, void 0, function* () {
            // Placeholder logic for converting JSON to String
            return `json to string`;
        });
    }
    // Method to convert JSON to XML
    convertJSONToXML(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = JSON.parse(input.buffer.toString("utf8"));
                const builder = new xml2js_1.default.Builder();
                let xml = builder.buildObject(data);
                xml = xml.replace(/standalone="yes"/, "");
                return xml;
            }
            catch (err) {
                console.error("Error converting JSON to XML:", err);
                throw new Error("Invalid JSON format");
            }
        });
    }
    // Main conversion method, uses the appropriate method based on the 'to' type
    convert(input, to, lineSeparator, elementSeparator) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (to) {
                case "txt":
                    return this.convertJSONToString(input, lineSeparator, elementSeparator); // Call the string conversion method
                case "xml":
                    return this.convertJSONToXML(input); // Call the XML conversion method
                default:
                    throw new Error(`Conversion from JSON to ${to} is not supported.`);
            }
        });
    }
}
exports.JSONConverter = JSONConverter;
