import express from "express";

import mongoose from "mongoose";
import cors from "cors";
import countryRoutes from "./routes/countryRoutes";
import stateRoutes from './routes/stateRoutes';
import cityRoutes from './routes/cityRoutes'

 import studentRoutes from "./routes/studentRoutes";
import dotenv from "dotenv"
import { errorHandler } from "./middleware/errorHandler";
dotenv.config()

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

 app.use("/student", studentRoutes);
 app.use("/country", countryRoutes);
 app.use("/state", stateRoutes);
 app.use("/city", cityRoutes);

app.use(errorHandler);


mongoose
  .connect("mongodb://127.0.0.1:27017/studentttdb")
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));
