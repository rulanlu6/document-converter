import { BaseConverter } from "./base-converter";
import { xmlToObject } from "../utils/xmlToObject";
import { objectToString } from "../utils/objectToString";
import { wrapObjectInArray } from "../utils/wrapObjectInArray";
import { parseStringPromise } from "xml2js";
export class XMLConverter extends BaseConverter {
  // Method to convert XML to String
  async convertXMLToString(
    input: Express.Multer.File,
    lineSeparator: string,
    elementSeparator: string
  ): Promise<string> {
    try {
      const data = input.buffer.toString("utf8");

      const object = xmlToObject(data);
      const string = objectToString(object, lineSeparator, elementSeparator);

      return string;
    } catch (err) {
      console.error("Error converting XML to String:", err);
      throw new Error("Invalid XML format");
    }
  }

  // Method to convert XML to JSON
  async convertXMLToJSON(input: Express.Multer.File): Promise<string> {
    try {
      const xml = input.buffer.toString("utf-8");
      const object = await parseStringPromise(xml, {
        explicitArray: false,
      });

      const root = Object.keys(object)[0]; // Remove the root tag
      let result = wrapObjectInArray(object[root]);

      return JSON.stringify(result, null, 2);
    } catch (error) {
      console.error("Error converting XML to JSON:", error);
      throw new Error("Invalid XML format");
    }
  }

  // Main conversion method, uses the appropriate method based on the 'to' type
  async convert(
    input: Express.Multer.File,
    to: string,
    lineSeparator: string,
    elementSeparator: string
  ): Promise<string> {
    switch (to) {
      case "text/plain":
        return this.convertXMLToString(input, lineSeparator, elementSeparator); // Call the string conversion method
      case "application/json":
        return this.convertXMLToJSON(input); // Call the JSON conversion method
      default:
        throw new Error(`Conversion from XML to ${to} is not supported.`);
    }
  }
}
