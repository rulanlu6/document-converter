import { Request, Response } from "express";
import { ConverterFactory } from "../factories/converter-factory";

export const converterController = async (req: Request, res: Response) => {
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
    return res.status(400).json({ error: "No document uploaded" });
  }

  try {
    const converterFactory = new ConverterFactory();
    const result = await converterFactory.getConverter(
      req.file,
      from,
      to,
      lineSeparator,
      elementSeparator
    );
    res.status(200).json({
      message: `File uploaded successfully from ${from} to ${to}`,
      result: result,
    });
  } catch (error) {
    res.status(500).json({
      error: "Something went wrong during the conversion",
    });
  }
};
