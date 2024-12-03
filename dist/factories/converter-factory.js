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
exports.ConverterFactory = void 0;
const string_converter_1 = require("../converters/string-converter");
const json_conveter_1 = require("../converters/json-conveter");
const xml_conveter_1 = require("../converters/xml-conveter");
class ConverterFactory {
    // General conversion method
    getConverter(input, from, to, lineSeparator, elementSeparator) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
}
exports.ConverterFactory = ConverterFactory;
