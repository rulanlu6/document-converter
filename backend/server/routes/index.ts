import express from "express";
import { converterController } from "../controllers/converter";
import { uploadMiddleware } from "../middlewares/upload";

const router = express.Router();

router.post("/convert", uploadMiddleware, converterController);

export default router;
