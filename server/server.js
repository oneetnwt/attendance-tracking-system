import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./db/connectDB.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Listening on port ${PORT}`);
});
