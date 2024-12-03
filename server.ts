import express, { Request, Response } from "express";
import cors from "cors";
import multer from "multer";
import bodyParser from "body-parser";

import { ConverterFactory } from "./factories/converter-factory";

const app = express();
const port: number = 8000;

app.use(cors());
app.use(bodyParser.json());

const storage = multer.memoryStorage();
const upload = multer({ storage });
const converterFactory = new ConverterFactory();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello!");
});

app.post(
  "/convert",
  upload.single("input"),
  async (req: Request, res: Response) => {
    const {
      from,
      to,
      lineSeparator,
      elementSeparator,
    }: {
      from: string;
      to: string;
      lineSeparator: string;
      elementSeparator: string;
    } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    try {
      // Send file to converter
      const result = await converterFactory.getConverter(
        req.file,
        from,
        to,
        lineSeparator,
        elementSeparator
      );

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

      res.status(200).json({
        message: `File uploaded successfully from ${from} to ${to}`,
        result: result,
      });
    } catch (error) {
      // Catching any error that might occur during conversion
      res.status(500).json({
        error: "Something went wrong during the conversion",
      });
    }
  }
);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
