"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.converterController = void 0;
const converter_factory_1 = require("../../factories/converter-factory");
const converterController = async (req, res) => {
    const { from, to, lineSeparator, elementSeparator, } = req.body;
    if (!req.file) {
        return res.status(400).json({ error: "No document uploaded" });
    }
    try {
        const converterFactory = new converter_factory_1.ConverterFactory();
        const result = await converterFactory.getConverter(req.file, from, to, lineSeparator, elementSeparator);
        res.status(200).json({
            message: `File uploaded successfully from ${from} to ${to}`,
            result: result,
        });
    }
    catch (error) {
        if (error instanceof Error && error.name === "UnsupportedConversion") {
            // Handle unsupported conversion error
            return res.status(400).json({
                error: error.message,
            });
        }
        res.status(500).json({
            error: "Something went wrong during the conversion",
        });
    }
};
exports.converterController = converterController;
