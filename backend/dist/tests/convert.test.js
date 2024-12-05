"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("supertest");
const server_1 = __importDefault(require("../server/server"));
const converter_factory_1 = require("../factories/converter-factory");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
describe("API Health Test", () => {
    // Test for a health check endpoint
    it("should return 200 for health check", async () => {
        const response = await request(server_1.default).get("/health");
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ status: "ok" });
    });
});
describe("Conversion Tests", () => {
    // Test cases for each conversion type
    const conversions = [
        {
            from: { type: "text/plain", extension: "txt" },
            to: { type: "application/xml", extension: "xml" },
        },
        {
            from: { type: "text/plain", extension: "txt" },
            to: { type: "application/json", extension: "json" },
        },
        {
            from: { type: "application/xml", extension: "xml" },
            to: { type: "application/json", extension: "json" },
        },
        {
            from: { type: "application/xml", extension: "xml" },
            to: { type: "text/plain", extension: "txt" },
        },
        {
            from: { type: "application/json", extension: "json" },
            to: { type: "application/xml", extension: "xml" },
        },
        {
            from: { type: "application/json", extension: "json" },
            to: { type: "text/plain", extension: "txt" },
        },
    ];
    // Test for the /convert endpoint
    conversions.forEach(({ from, to }) => {
        it(`should convert from ${from.type} to ${to.type}`, async () => {
            const filePath = path_1.default.join(__dirname, `./data/sample.${from.extension}`);
            const mockFile = fs_1.default.readFileSync(filePath);
            const response = await request(server_1.default)
                .post("/convert")
                .field("input", mockFile, `sample.${from.extension}`)
                .field("from", `${from.type}`)
                .field("to", `${to.type}`)
                .field("lineSeparator", "~")
                .field("elementSeparator", "*");
            expect(response.status).toBe(200);
            expect(response._body.message).toBe(`File uploaded successfully from ${from.type} to ${to.type}`);
            const comparisonFilePath = path_1.default.join(__dirname, `./data/sample.${to.extension}`);
            const comparisonFileContent = fs_1.default
                .readFileSync(comparisonFilePath, "utf-8")
                .replace(/\r?\n|\r/g, "");
            // Compare the response to the comparison file (with new lines trimmed)
            expect(response._body.result.replace(/\r?\n|\r/g, "")).toBe(comparisonFileContent);
        });
    });
});
describe("Error Handling Tests", () => {
    // Test for missing file upload
    it("should return 400 if no file is uploaded", async () => {
        const response = await request(server_1.default)
            .post("/convert")
            .field("from", "text/plain")
            .field("to", "application/xml")
            .field("lineSeparator", "~")
            .field("elementSeparator", "*");
        expect(response.status).toBe(400);
        expect(response.body.error).toBe("No document uploaded");
    });
    // Test for invalid conversion (unsupported 'to')
    it("should return 400 for invalid conversion formats", async () => {
        const fileName = "sample.txt";
        const filePath = path_1.default.join(__dirname, `./data/${fileName}`);
        const mockFile = fs_1.default.readFileSync(filePath);
        const response = await request(server_1.default)
            .post("/convert")
            .attach("input", mockFile, fileName)
            .field("from", "text/plain")
            .field("to", "video/mp4") // Unsupported format
            .field("lineSeparator", "~")
            .field("elementSeparator", "*");
        expect(response.status).toBe(400);
        expect(response.body.error).toBe("Conversion from String to video/mp4 is not supported.");
    });
    // Test for server error during conversion
    it("should return 500 if there is an error during conversion", async () => {
        const fileName = "sample.txt";
        const filePath = path_1.default.join(__dirname, `./data/${fileName}`);
        const mockFile = fs_1.default.readFileSync(filePath);
        // Simulate a failure in conversion
        jest
            .spyOn(converter_factory_1.ConverterFactory.prototype, "getConverter")
            .mockImplementationOnce(() => {
            throw new Error("Conversion failed");
        });
        const response = await request(server_1.default)
            .post("/convert")
            .attach("input", mockFile, "sample.txt")
            .field("from", "text/plain")
            .field("to", "application/xml")
            .field("lineSeparator", "~")
            .field("elementSeparator", "*");
        expect(response.status).toBe(500);
        expect(response.body.error).toBe("Something went wrong during the conversion");
    });
});
