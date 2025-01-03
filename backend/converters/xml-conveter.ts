import { BaseConverter } from "./base-converter";
import { xmlToObject } from "./helpers/xmlToObject";
import { objectToString } from "./helpers/objectToString";
import { wrapObjectInArray } from "./helpers/wrapObjectInArray";
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
      throw new Error("Error converting XML to String");
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
      throw new Error("Error converting XML to JSON");
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
        return this.convertXMLToString(input, lineSeparator, elementSeparator);
      case "application/json":
        return this.convertXMLToJSON(input);
      default:
        const error = new Error(
          `Conversion from String to ${to} is not supported.`
        );
        error.name = "UnsupportedConversion";
        throw error;
    }
  }
}
