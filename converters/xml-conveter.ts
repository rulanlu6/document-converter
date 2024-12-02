export async function conversionFromXML(
  input: string,
  to: string
): Promise<string> {
  switch (to) {
    case "json":
      return `xml to json ${input}`;
    case "string":
      return `xml to string ${input}`;
    default:
      throw new Error(`Conversion from XML to ${to} is not supported.`);
  }
}
