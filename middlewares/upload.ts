import multer from "multer";

// Configuring multer to store file in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

export const uploadMiddleware = upload.single("input");
