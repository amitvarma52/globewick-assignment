/** @format */

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { connect } from "./db/DB.js";
import userRouter from "./MVC/route/userRoute.js";
const app = express();
dotenv.config();
// middlewares
app.use(cors());
app.use(express.json(""));
app.use(morgan("dev"));
// DB
connect();
app.get("/", (req, res) => {
  res.send("hello server");
});
// api
app.use("/api/v1/user", userRouter);
// listen
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`listening to ${PORT}`);
});
app.listen();