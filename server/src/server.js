import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./db/connectDB.js";
import attendanceRoute from "./routes/attendanceRoute.js";
import adminRoute from "./routes/adminRoute.js";

dotenv.config();

const app = express();

// Increase request size limit to 50MB
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

app.use("/api", attendanceRoute);
app.use("/admin", adminRoute);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
  connectDB();
});
