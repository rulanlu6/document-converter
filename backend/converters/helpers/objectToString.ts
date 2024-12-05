export const objectToString = (
  object: string,
  lineSeparator: string,
  elementSeparator: string
): string => {
  const lines: string[] = [];
  for (const [key, value] of Object.entries(object)) {
    // If the value is an array, process each object inside it as a line
    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (typeof item === "object" && item !== null) {
          const elements = Object.values(item).join(elementSeparator);
          lines.push(`${key}${elementSeparator}${elements}`);
        }
      });
    }
  }

  return lines.join(lineSeparator + "\n") + lineSeparator;
};
