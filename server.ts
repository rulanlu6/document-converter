import express, { Request, Response } from "express";
import cors from "cors";
import multer from "multer";
import bodyParser from "body-parser";

import { FileConverter } from "./converters/file-converter";

const app = express();
const port: number = 8000;

app.use(cors());
app.use(bodyParser.json());

const storage = multer.memoryStorage();
const upload = multer({ storage });
const fileConverter = new FileConverter();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello!");
});

app.post(
  "/api/convert",
  upload.single("input"),
  async (req: Request, res: Response) => {
    const { from, to }: { from: string; to: string } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    try {
      // Send file to converter
      const result = await fileConverter.convert(req.file, from, to);

      res.status(200).json({
        message: `File uploaded successfully from ${from} to ${to}`,
        filename: req.file.filename,
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
