// controllers/fileController.js
const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
const File = require("../models/File");

const conn = mongoose.connection;
Grid.mongo = mongoose.mongo;
const gfs = Grid(conn.db);

exports.uploadFile = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const { originalname, buffer } = req.file;
  const filename = `${Date.now()}-${originalname}`;

  const writeStream = gfs.createWriteStream({ filename });
  writeStream.write(buffer);
  writeStream.end();

  writeStream.on("close", (file) => {
    const newFile = new File({
      filename: file.filename,
      fileId: file._id,
      uploadDate: new Date(),
    });

    newFile.save((err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error saving file information" });
      }

      // Generate a downloadable URL and send it to the client side
      const downloadLink = `/files/download/${file._id}`;
      res.json({ fileId: file._id, downloadLink });
    });
  });
};
