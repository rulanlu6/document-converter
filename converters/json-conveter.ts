import { BaseConverter } from "./base-converter";
import xml2js from "xml2js";
export class JSONConverter extends BaseConverter {
  // Method to convert JSON to String
  async convertJSONToString(
    input: Express.Multer.File,
    lineSeparator: string,
    elementSeparator: string
  ): Promise<string> {
    // Placeholder logic for converting JSON to String
    return `json to string`;
  }

  // Method to convert JSON to XML
  async convertJSONToXML(input: Express.Multer.File): Promise<string> {
    try {
      const data = JSON.parse(input.buffer.toString("utf8"));
      const builder = new xml2js.Builder();
      let xml = builder.buildObject(data);

      xml = xml.replace(/standalone="yes"/, "");

      return xml;
    } catch (err) {
      console.error("Error converting JSON to XML:", err);
      throw new Error("Invalid JSON format");
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
        return this.convertJSONToString(input, lineSeparator, elementSeparator); // Call the string conversion method
      case "application/xml":
        return this.convertJSONToXML(input); // Call the XML conversion method
      default:
        throw new Error(`Conversion from JSON to ${to} is not supported.`);
    }
  }
}
