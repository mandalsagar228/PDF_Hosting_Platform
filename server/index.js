import express from "express";
import Connection from "./database/db.js";
import Router from "./routes/route.js";

import dotenv from "dotenv";
import morgan from "morgan";

import cors from "cors";
import bodyParser from "body-parser";

import helmet from "helmet";

const app = express();

const PORT = process.env.PORT || 8000;

dotenv.config();
app.use(cors());

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", Router);

Connection(); //Connecting Database
//  Established server conection
const startServer = () => {
  app.listen(PORT, () => {
    console.log(`server is connected on port no ${PORT} successfully.`);
  });
};
startServer();
app.get("/", (req, res) => {
  res.send("Connected to the server");
});
