import express from "express";
import { uploadFile, getPdf } from "../controller/uploadFile.controller.js";
import upload from "../middleware/upload.js";

const Router = express.Router();

Router.post("/upload", upload.single("file"), uploadFile);
Router.get("/file/:filename", getPdf);

export default Router;
