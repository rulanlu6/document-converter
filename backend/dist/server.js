"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const multer_1 = __importDefault(require("multer"));
const body_parser_1 = __importDefault(require("body-parser"));
const converter_factory_1 = require("./factories/converter-factory");
const app = (0, express_1.default)();
const port = 8000;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage });
const converterFactory = new converter_factory_1.ConverterFactory();
app.get("/", (req, res) => {
    res.send("Hello!");
});
app.post("/convert", upload.single("input"), async (req, res) => {
    const { from, to, lineSeparator, elementSeparator, } = req.body;
    if (!req.file) {
        return res.status(400).json({ error: "No document uploaded" });
    }
    try {
        // Send document to converter
        const result = await converterFactory.getConverter(req.file, from, to, lineSeparator, elementSeparator);
        res.status(200).json({
            message: `File uploaded successfully from ${from} to ${to}`,
            result: result,
        });
    }
    catch (error) {
        // Catching any error that might occur during conversion
        res.status(500).json({
            error: "Something went wrong during the conversion",
        });
    }
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
