"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
app.post("/convert", upload.single("input"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { from, to, lineSeparator, elementSeparator, } = req.body;
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }
    try {
        // Send file to converter
        const result = yield converterFactory.getConverter(req.file, from, to, lineSeparator, elementSeparator);
        // Decide if I want to send over full file
        // const outputFileName = `output.${to}`;
        // const filePath = path.join(__dirname, "../files", outputFileName);
        // fs.writeFileSync(filePath, result);
        // console.log("File written, preparing to send...");
        // res.sendFile(filePath, (err) => {
        //   if (err) {
        //     res.status(500).json({ error: "Failed to send the file" });
        //   }
        //   // Delete the file after sending it
        //   fs.unlinkSync(filePath);
        // });
        console.log(result);
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
}));
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
