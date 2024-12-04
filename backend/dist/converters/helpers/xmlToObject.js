"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.xmlToObject = void 0;
const xmlToObject = (xml) => {
    const startTag = "<root>";
    const endTag = "</root>";
    const startIndex = xml.indexOf(startTag) + startTag.length;
    const endIndex = xml.indexOf(endTag);
    // Extract the content between <root> and </root>
    const content = xml.slice(startIndex, endIndex).replace(/[\r\n]+/g, "");
    let object = {};
    // Extract the main tag (key)
    const regex = /<(\w+)>\s*(.*?)\s*<\/\1>/gs;
    let match;
    while ((match = regex.exec(content)) !== null) {
        const mainTag = match[1];
        const subTagRegex = /<(\w+)>(.*?)<\/\1>/gs;
        const subtags = {};
        let subMatch;
        while ((subMatch = subTagRegex.exec(match[2])) !== null) {
            const subTag = subMatch[1];
            const value = subMatch[2];
            subtags[subTag] = value;
        }
        // Handle if a key has multiple values
        if (object.hasOwnProperty(mainTag)) {
            object[mainTag].push(subtags);
        }
        else {
            object[mainTag] = [subtags];
        }
    }
    return object;
};
exports.xmlToObject = xmlToObject;
