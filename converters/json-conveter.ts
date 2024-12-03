import { BaseConverter } from "./base-converter";
export class JSONConverter extends BaseConverter {
  // Method to convert JSON to String
  async convertJSONToString(input: Express.Multer.File): Promise<string> {
    // Placeholder logic for converting JSON to String
    return `json to string`;
  }

  // Method to convert JSON to XML
  async convertJSONToXML(input: Express.Multer.File): Promise<string> {
    // Placeholder logic for converting JSON to XML
    return `json to xml`;
  }

  // Main conversion method, uses the appropriate method based on the 'to' type
  async convert(
    input: Express.Multer.File,
    to: string,
    lineSeparator: string,
    elementSeparator: string
  ): Promise<string> {
    switch (to) {
      case "string":
        return this.convertJSONToString(input); // Call the string conversion method
      case "xml":
        return this.convertJSONToXML(input); // Call the XML conversion method
      default:
        throw new Error(`Conversion from JSON to ${to} is not supported.`);
    }
  }
}
