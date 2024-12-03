import { stringToObjectParser } from "./helper";

export class StringConverter {
  // Method to convert String to JSON
  async convertStringToJSON(
    input: Express.Multer.File,
    lineSeparator: string,
    elementSeparator: string
  ): Promise<string> {
    let result: string | undefined;
    try {
      const data = input.buffer.toString("utf8");
      const object = stringToObjectParser(
        data,
        lineSeparator,
        elementSeparator
      );
      result = JSON.stringify(object, null, 2);
    } catch (err) {
      console.log(err);
    }
    return result || "";
  }

  // Method to convert String to XML
  async convertStringToXML(
    input: Express.Multer.File,
    lineSeparator: string,
    elementSeparator: string
  ): Promise<string> {
    // Placeholder logic for converting string to XML
    return `string to xml`;
  }

  // Main conversion method, uses the appropriate method based on the 'to' type
  async convert(
    input: Express.Multer.File,
    to: string,
    lineSeparator: string,
    elementSeparator: string
  ): Promise<string> {
    switch (to) {
      case "json":
        return this.convertStringToJSON(input, lineSeparator, elementSeparator); // Call the JSON conversion method
      case "xml":
        return this.convertStringToXML(input, lineSeparator, elementSeparator); // Call the XML conversion method
      default:
        throw new Error(`Conversion from String to ${to} is not supported.`);
    }
  }
}
