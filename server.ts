import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const port: number = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
