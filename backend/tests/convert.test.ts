const request = require("supertest");

import app from "../server/server";
import path from "path";
import fs from "fs";

describe("API Tests", () => {
  // Test for a health check endpoint
  it("should return 200 for health check", async () => {
    const response = await request(app).get("/health");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: "ok" });
  });

  // Test for the /convert endpoint (successful case)
  it("should convert a text file to xml", async () => {
    const fileName = "sample.txt";
    const filePath = path.join(__dirname, `./data/${fileName}`);
    const mockFile = fs.readFileSync(filePath);

    // Make the POST request with the text file
    const response = await request(app)
      .post("/convert")
      .field("input", mockFile, fileName)
      .field("from", "text/plain")
      .field("to", "application/xml")
      .field("lineSeparator", "~")
      .field("elementSeparator", "*");

    // Assert the response status
    expect(response.status).toBe(200);
    expect(response._body.message).toContain("application/xml");
    expect(response._body.result).toContain("<root>");
  });

  // Test for missing file upload
  it("should return 400 if no file is uploaded", async () => {
    const response = await request(app)
      .post("/convert")
      .field("from", "text/plain")
      .field("to", "application/xml")
      .field("lineSeparator", "~")
      .field("elementSeparator", "*");

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("No document uploaded");
  });

  // Test for invalid conversion (unsupported 'from' or 'to')
  it("should return 400 for invalid conversion formats", async () => {
    const fileName = "sample.txt";
    const filePath = path.join(__dirname, `./data/${fileName}`);
    const mockFile = fs.readFileSync(filePath);

    const response = await request(app)
      .post("/convert")
      .attach("input", mockFile, fileName)
      .field("from", "text/plain")
      .field("to", "video/mp4") // Unsupported format
      .field("lineSeparator", "~")
      .field("elementSeparator", "*");

    expect(response.status).toBe(400);
    expect(response.body.error).toBe(
      "Conversion from String to video/mp4 is not supported."
    );
  });
});
