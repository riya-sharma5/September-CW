import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import errorHandler from "./middleware/errorHandler";
import mongoose from "mongoose";
import movieRoutes from "./routes/moviesRoutes";


dotenv.config();

const app = express();

const PORT =  process.env.PORT || 9004;

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use("/api", movieRoutes);

app.use(errorHandler);

export const connectDb = async () => {
  try {
    await mongoose.connect("mongodb+srv://riyasharma978715_db_user:riya%401234567890@cluster0.epfeyjp.mongodb.net/sample_mflix?retryWrites=true&w=majority");

    mongoose.set("debug", true);
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(` Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(" MongoDB connection error:", error);
    process.exit(1);
  }
};

connectDb();
