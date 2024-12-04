import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import router from "../routes";

const app = express();
const port: number = 8000;

app.use(cors());
app.use(bodyParser.json());

app.use(router);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
