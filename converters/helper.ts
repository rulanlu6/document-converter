export const stringToObject = (
  inputString: string,
  lineSeparator: string,
  elementSeparator: string
) => {
  inputString = inputString.replace(/(\r\n|\n|\r)/gm, ""); // Remove line breaks
  const lines = inputString.split(lineSeparator);
  const result: { [key: string]: any[] } = {};

  lines.forEach((line) => {
    const parts = line
      .split(elementSeparator)
      .filter((line) => line.trim() !== "");

    const key = parts[0];
    const values = parts.slice(1);

    if (key) {
      // If the key doesn't exist in the result object, initialize it as an empty array
      if (!result[key]) {
        result[key] = [];
      }

      const obj: { [key: string]: string } = {};

      values.forEach((value, index) => {
        obj[`${key}${index + 1}`] = value;
      });

      result[key].push(obj);
    }
  });

  return result;
};

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
          return `${indent}<${key}>${value}</${key}>`; // If value is string, return it directly
        } else {
          return objectToXML(value, depth, key);
        }
      })
      .join("\n");
  }

  return `${indent}${String(object)}`;
};

export const wrapObjectInArray = (obj: any): any => {
  // Iterate over each top-level key in the object
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];

      // If the value is not already an array, wrap it in an array
      if (!Array.isArray(value)) {
        obj[key] = [value];
      }
    }
  }

  return obj;
};

export const objectInsertSeparators = (
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

  return lines.join(lineSeparator);
};

export const xmlToObject = (xml: string): any => {
  const startTag: string = "<root>";
  const endTag: string = "</root>";
  const startIndex = xml.indexOf(startTag) + startTag.length;
  const endIndex = xml.indexOf(endTag);

  // Extract the content between the <root> and </root> tags (including the tags)
  const content = xml.slice(startIndex, endIndex).replace(/[\r\n]+/g, "");

  type Subtags = {
    [key: string]: string;
  };

  // Define the type for the main tag and its subtags (as an array)
  type Tags = {
    [key: string]: Subtags[];
  };

  let object: Tags = {};

  // Extract the main tag (key)
  const regex = /<(\w+)>\s*(.*?)\s*<\/\1>/gs;

  let match: RegExpExecArray | null;
  while ((match = regex.exec(content)) !== null) {
    const mainTag = match[1];
    const subTagRegex = /<(\w+)>(.*?)<\/\1>/gs; // To match subtags (values)
    const subtags: Subtags = {};

    let subMatch: RegExpExecArray | null;
    while ((subMatch = subTagRegex.exec(match[2])) !== null) {
      const subTag = subMatch[1];
      const value = subMatch[2];
      subtags[subTag] = value;
    }

    // Handle if a key has multiple values
    if (object.hasOwnProperty(mainTag)) {
      object[mainTag].push(subtags);
    } else {
      object[mainTag] = [subtags];
    }
  }

  return object;
};
