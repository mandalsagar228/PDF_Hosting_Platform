import multer from "multer";
import dotenv from "dotenv";

import { GridFsStorage } from "multer-gridfs-storage";

dotenv.config();

const storage = new GridFsStorage({
  url: process.env.DB_URL,
  options: { useNewUrlParser: true },
  file: (request, file) => {
    return {
      bucketName: "pdf",
      filename: `${Date.now}-pdf-${file.originalname}`,
    };
  },
});

export default multer({ storage });
