import { StringConverter } from "./string-converter";
import { JSONConverter } from "./json-conveter";
import { XMLConverter } from "./xml-conveter";

export class FileConverter {
  // General conversion method
  async convert(
    input: Express.Multer.File,
    from: string,
    to: string,
    lineSeparator: string,
    elementSeparator: string
  ): Promise<string> {
    let converter;
    // Determine which class to instantiate based on 'from' type
    switch (from) {
      case "text/plain":
        converter = new StringConverter();
        break;
      case "application/json":
        converter = new JSONConverter();
        break;
      case "application/xml":
        converter = new XMLConverter();
        break;
      // More cases can be added for other format conversions
      default:
        throw new Error(`Conversion from ${from} to ${to} is not supported.`);
    }

    return converter.convert(input, to, lineSeparator, elementSeparator);
  }
}
