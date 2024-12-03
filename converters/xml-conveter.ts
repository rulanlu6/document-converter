import { BaseConverter } from "./base-converter";
import { wrapObjectInArray } from "./helper";
import { parseStringPromise } from "xml2js";
export class XMLConverter extends BaseConverter {
  // Method to convert XML to String
  async convertXMLToString(input: Express.Multer.File): Promise<string> {
    // Placeholder logic for converting XML to String
    return `xml to string`;
  }

  // Method to convert XML to JSON
  async convertXMLToJSON(input: Express.Multer.File): Promise<string> {
    try {
      const xml = input.buffer.toString("utf-8");
      const object = await parseStringPromise(xml, {
        explicitArray: false,
      });

      const root = Object.keys(object)[0]; // Don't include root tag
      let json = wrapObjectInArray(object[root]);

      return JSON.stringify(json, null, 2);
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
      case "txt":
        return this.convertXMLToString(input); // Call the string conversion method
      case "json":
        return this.convertXMLToJSON(input); // Call the JSON conversion method
      default:
        throw new Error(`Conversion from XML to ${to} is not supported.`);
    }
  }
}
