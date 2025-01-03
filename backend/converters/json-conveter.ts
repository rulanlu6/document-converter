import { BaseConverter } from "./base-converter";
import { objectToString } from "./helpers/objectToString";
import xml2js from "xml2js";
export class JSONConverter extends BaseConverter {
  // Method to convert JSON to String
  async convertJSONToString(
    input: Express.Multer.File,
    lineSeparator: string,
    elementSeparator: string
  ): Promise<string> {
    try {
      const data = JSON.parse(input.buffer.toString("utf8"));

      let string = objectToString(data, lineSeparator, elementSeparator);

      return string;
    } catch (err) {
      console.error("Error converting JSON to String:", err);
      throw new Error("Error converting JSON to String");
    }
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
      throw new Error("Error converting JSON to XML");
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
        return this.convertJSONToString(input, lineSeparator, elementSeparator);
      case "application/xml":
        return this.convertJSONToXML(input);
      default:
        const error = new Error(
          `Conversion from String to ${to} is not supported.`
        );
        error.name = "UnsupportedConversion";
        throw error;
    }
  }
}
