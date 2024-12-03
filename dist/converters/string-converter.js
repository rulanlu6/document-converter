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
const helper_1 = require("./helper");
class StringConverter {
    // Method to convert String to JSON
    convertStringToJSON(input, lineSeparator, elementSeparator) {
        return __awaiter(this, void 0, void 0, function* () {
            // Placeholder logic for converting string to JSON
            let result;
            try {
                const data = input.buffer.toString("utf8");
                const object = (0, helper_1.stringToObjectParser)(data, lineSeparator, elementSeparator);
                result = JSON.stringify(object, null, 2);
            }
            catch (err) {
                console.log(err);
            }
            // console.log("input", input);
            return result || "";
        });
    }
    // Method to convert String to XML
    convertStringToXML(input, lineSeparator, elementSeparator) {
        return __awaiter(this, void 0, void 0, function* () {
            // Placeholder logic for converting string to XML
            return `string to xml`;
        });
    }
    // Main conversion method, uses the appropriate method based on the 'to' type
    convert(input, to, lineSeparator, elementSeparator) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (to) {
                case "json":
                    return this.convertStringToJSON(input, lineSeparator, elementSeparator); // Call the JSON conversion method
                case "xml":
                    return this.convertStringToXML(input, lineSeparator, elementSeparator); // Call the XML conversion method
                default:
                    throw new Error(`Conversion from String to ${to} is not supported.`);
            }
        });
    }
}
exports.StringConverter = StringConverter;
