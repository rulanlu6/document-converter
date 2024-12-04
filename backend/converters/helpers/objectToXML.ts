export const objectToXML = (
  object: object | any[],
  depth: number = 0,
  rootKey: string = ""
): string => {
  const indent = "  ".repeat(depth); // Two spaces per depth level

  if (Array.isArray(object)) {
    return object
      .map((value) => {
        return `${indent}<${rootKey}>\n${objectToXML(
          value,
          depth + 1,
          rootKey
        )}\n${indent}</${rootKey}>`;
      })
      .join("\n");
  }

  if (typeof object === "object") {
    return Object.entries(object)
      .map(([key, value]) => {
        if (typeof value === "string") {
          return `${indent}<${key}>${value}</${key}>`;
        } else {
          return objectToXML(value, depth, key);
        }
      })
      .join("\n");
  }

  return `${indent}${String(object)}`;
};
