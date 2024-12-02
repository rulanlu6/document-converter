export async function conversionFromJSON(
  input: string,
  to: string
): Promise<string> {
  switch (to) {
    case "string":
      return `json to string ${input}`;
    case "xml":
      return `json to xml ${input}`;
    default:
      throw new Error(`Conversion from JSON to ${to} is not supported.`);
  }
}
