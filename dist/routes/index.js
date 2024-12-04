"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const converter_1 = require("../controllers/converter");
const upload_1 = require("../middlewares/upload");
const router = express_1.default.Router();
router.post("/convert", upload_1.uploadMiddleware, converter_1.converterController);
exports.default = router;
