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
