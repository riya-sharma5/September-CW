import express from "express";

import mongoose from "mongoose";
import cors from "cors";
import countryRoutes from "./routes/countryRoutes.ts";
import stateRoutes from './routes/stateRoutes.ts';
import cityRoutes from './routes/cityRoutes.ts'

 import studentRoutes from "./routes/studentRoutes.ts";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

 app.use("/student", studentRoutes);
 app.use("/country", countryRoutes);
 app.use("/state", stateRoutes);
 app.use("/city", cityRoutes);

mongoose
  .connect("mongodb://127.0.0.1:27017/studenttdb")
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));
