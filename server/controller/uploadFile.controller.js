const url = "https://pdf-hosting-platform.onrender.com";
import mongoose, { mongo } from "mongoose";

import Grid from "gridfs-stream";
let gfs, gridfsBucket;
const conn = mongoose.connection;
conn.once("open", () => {
  gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "pdf",
  });
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("pdf");
});

export const uploadFile = (req, res) => {
  console.log("file-", req.file);
  console.log("filename-", req.file.filename);
  if (!req.file) {
    return res.status(404).json({ msg: "File not found" });
  }

  const pdfUrl = `${url}/file/${req.file.filename}`;
  return res.status(200).json(pdfUrl);
};

export const getPdf = async (req, res) => {
  const file = await gfs.files.findOne({ filename: req.params.filename });
  console.log("filegg-", file);
  if (file.length === 0) {
    return res.status(404).json({ msg: "File not found" });
  }
  // Set the appropriate content type for PDF

  const readStream = gridfsBucket.openDownloadStream(file._id);

  res.setHeader("Content-Type", "application/pdf");
  readStream.pipe(res);
  try {
  } catch (error) {
    return res.status(500).json({ msg: "somthing error", error });
  }
};
