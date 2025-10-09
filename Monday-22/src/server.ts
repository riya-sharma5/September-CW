import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import requestUser from "./routes/requestUserRoutes";
import countryRoutes from "./routes/countryRoutes";
import stateRoutes from "./routes/stateRoutes";
import cityRoutes from "./routes/cityRoutes";
import userRoutes from "./routes/userRoutes";
import availableRoutes from "./routes/availableRoutes";
import { errorHandler } from "./middleware/errorHandler";
import {task} from './crons/crons'


dotenv.config();

const app = express();
const PORT = 9595;

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.use("/user", userRoutes);
app.use("/country", countryRoutes);
app.use("/state", stateRoutes);
app.use("/city", cityRoutes);
app.use("/availability", availableRoutes);
app.use('/request', requestUser);

app.use(errorHandler);

mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/userrrrrrdb")
  .then(() => {
    mongoose.set({ debug: true });
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
    task.start();
  })
  .catch((err) => console.error("MongoDB connection error:", err));
