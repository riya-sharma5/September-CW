import express from "express";

import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import studentRoutes from "./routes/studentRoutes.ts";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use("/", studentRoutes);

mongoose
  .connect("mongodb://127.0.0.1:27017/studentdb")
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));
