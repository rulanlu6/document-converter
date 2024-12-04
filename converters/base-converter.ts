export abstract class BaseConverter {
  // All converter classes need to implement a convert method
  abstract convert(
    input: Express.Multer.File,
    to: string,
    lineSeparator: string,
    elementSeparator: string
  ): Promise<string>;
}
