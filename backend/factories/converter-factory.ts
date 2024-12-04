import { StringConverter } from "../converters/string-converter";
import { JSONConverter } from "../converters/json-conveter";
import { XMLConverter } from "../converters/xml-conveter";
import { BaseConverter } from "../converters/base-converter";

export class ConverterFactory {
  private converterMap: Map<string, new () => BaseConverter> = new Map();

  constructor() {
    // Map file types to converter classes
    this.converterMap.set("text/plain", StringConverter);
    this.converterMap.set("application/json", JSONConverter);
    this.converterMap.set("application/xml", XMLConverter);
    this.converterMap.set("text/xml", XMLConverter);
  }

  async getConverter(
    input: Express.Multer.File,
    from: string,
    to: string,
    lineSeparator: string,
    elementSeparator: string
  ): Promise<string> {
    // Check if we have a converter for the given 'from' format
    const ConverterClass = this.converterMap.get(from);

    if (!ConverterClass) {
      throw new Error(`No converter found for format: ${from}`);
    }

    const converter = new ConverterClass();
    return converter.convert(input, to, lineSeparator, elementSeparator);
  }
}
