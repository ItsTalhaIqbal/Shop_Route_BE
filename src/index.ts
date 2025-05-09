"use strict"
import express, { Request, Response, urlencoded } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ConnectDB } from "./config/db";
import { router } from "./routes/Route";
import path from "node:path";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    credentials: true,
  })
);
app.use(express.json());
app.use(urlencoded({ extended: false }));

app.get('/',(req:Request,res:Response)=>{
  res.json({Message:"Hello from backend"})
})
app.use("/api", router);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

ConnectDB();
app.listen(port, () => {
  console.log(`Servers is running on http://localhost:${port}`);
});
