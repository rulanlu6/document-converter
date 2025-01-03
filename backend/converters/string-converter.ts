import { BaseConverter } from "./base-converter";
import { stringToObject } from "./helpers/stringToObject";
import { objectToXML } from "./helpers/objectToXML";

export class StringConverter extends BaseConverter {
  // Method to convert String to JSON
  async convertStringToJSON(
    input: Express.Multer.File,
    lineSeparator: string,
    elementSeparator: string
  ): Promise<string> {
    try {
      const data = input.buffer.toString("utf8");
      const object = stringToObject(data, lineSeparator, elementSeparator);
      const json = JSON.stringify(object, null, 2);

      return json;
    } catch (err) {
      console.error("Error converting string to JSON:", err);
      throw new Error("Error converting string to JSON");
    }
  }

  // Method to convert String to XML
  async convertStringToXML(
    input: Express.Multer.File,
    lineSeparator: string,
    elementSeparator: string
  ): Promise<string> {
    try {
      const data = input.buffer.toString("utf8");
      const object = stringToObject(data, lineSeparator, elementSeparator);
      const xml = `<?xml version="1.0" encoding="UTF-8" ?>\n<root>\n${objectToXML(
        object,
        1
      )}\n</root>`;

      return xml;
    } catch (err) {
      console.error("Error converting string to XML:", err);
      throw new Error("Error converting string to XML");
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
      case "application/json":
        return this.convertStringToJSON(input, lineSeparator, elementSeparator);
      case "application/xml":
        return this.convertStringToXML(input, lineSeparator, elementSeparator);
      default:
        const error = new Error(
          `Conversion from String to ${to} is not supported.`
        );
        error.name = "UnsupportedConversion";
        throw error;
    }
  }
}
