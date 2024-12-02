export async function conversionFromString(
  input: string,
  to: string
): Promise<string> {
  switch (to) {
    case "json":
      return `string to json ${input}`;
    case "xml":
      return `string to xml ${input}`;
    default:
      throw new Error(`Conversion from String to ${to} is not supported.`);
  }
}
