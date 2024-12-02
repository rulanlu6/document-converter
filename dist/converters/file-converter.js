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
exports.FileConverter = void 0;
const string_converter_1 = require("./string-converter");
const json_conveter_1 = require("./json-conveter");
const xml_conveter_1 = require("./xml-conveter");
class FileConverter {
    // General conversion method
    convert(input, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (from) {
                case "text/plain":
                    return (0, string_converter_1.conversionFromString)(input, to);
                case "application/json":
                    return (0, json_conveter_1.conversionFromJSON)(input, to);
                case "application/xml":
                    return (0, xml_conveter_1.conversionFromXML)(input, to);
                // More cases can be added for other format conversions
                default:
                    throw new Error(`Conversion from ${from} to ${to} is not supported.`);
            }
        });
    }
}
exports.FileConverter = FileConverter;
