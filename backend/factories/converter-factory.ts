import { StringConverter } from "../converters/string-converter";
import { JSONConverter } from "../converters/json-conveter";
import { XMLConverter } from "../converters/xml-conveter";

export class ConverterFactory {
  // General conversion method
  async getConverter(
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
      case "text/xml":
        converter = new XMLConverter();
        break;
      // More cases can be added for other format conversions
      default:
        throw new Error(`Conversion from ${from} to ${to} is not supported.`);
    }

    return converter.convert(input, to, lineSeparator, elementSeparator);
  }
}
