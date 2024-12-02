import { conversionFromString } from "./string-converter";
import { conversionFromJSON } from "./json-conveter";
import { conversionFromXML } from "./xml-conveter";

export class FileConverter {
  // General conversion method
  async convert(input: string, from: string, to: string): Promise<string> {
    switch (from) {
      case "string":
        return conversionFromString(input, to);
      case "json":
        return conversionFromJSON(input, to);
      case "xml":
        return conversionFromXML(input, to);
      // More cases can be added for other format conversions
      default:
        throw new Error(`Conversion from ${from} to ${to} is not supported.`);
    }
  }
}
