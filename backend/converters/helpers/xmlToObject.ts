export const xmlToObject = (xml: string): any => {
  const startTag: string = "<root>";
  const endTag: string = "</root>";
  const startIndex = xml.indexOf(startTag) + startTag.length;
  const endIndex = xml.indexOf(endTag);

  // Extract the content between <root> and </root>
  const content = xml.slice(startIndex, endIndex).replace(/[\r\n]+/g, "");

  type Subtags = {
    [key: string]: string;
  };

  type Tags = {
    [key: string]: Subtags[];
  };

  let object: Tags = {};

  // Extract the main tag (key)
  const regex = /<(\w+)>\s*(.*?)\s*<\/\1>/gs;

  let match: RegExpExecArray | null;
  while ((match = regex.exec(content)) !== null) {
    const mainTag = match[1];
    const subTagRegex = /<(\w+)>(.*?)<\/\1>/gs;
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
