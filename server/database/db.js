import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
const Connection = () => {
  const URL = process.env.DB_URL;
  mongoose.connect(URL, { useNewUrlParser: true });
  mongoose.connection.on("connected", () => {
    console.log("Database has connected successfully.");
  });
  mongoose.connection.on("disconnected", () => {
    console.log("Database disconnected");
  });
  mongoose.connection.on("error", (error) => {
    console.log("Error while connecting to the database", error.message);
  });
};

export default Connection;
