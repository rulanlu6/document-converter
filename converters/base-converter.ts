export abstract class BaseConverter {
  // All converter files need to implement a convert method
  abstract convert(
    input: Express.Multer.File,
    to: string,
    lineSeparator: string,
    elementSeparator: string
  ): Promise<string>;
}
