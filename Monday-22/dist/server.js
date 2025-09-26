import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import countryRoutes from "./routes/countryRoutes.js";
import stateRoutes from "./routes/stateRoutes.js";
import cityRoutes from "./routes/cityRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/errorHandler.js";
import bodyParser from "body-parser";
dotenv.config();
const app = express();
// app.get("/", (req,res) => {
//   console.log(`app listen`);
//   res.send("Hello world !!!");
// })
// app.listen(8585,() => {
//   console.log(`app listen at `, 8585);
// })
app.use(express.urlencoded({ extended: false }));
const PORT = 9595;
app.use(cors());
app.use(bodyParser.json());
app.use("/user", userRoutes);
app.use("/country", countryRoutes);
app.use("/state", stateRoutes);
app.use("/city", cityRoutes);
app.use(errorHandler);
mongoose
    .connect("mongodb://127.0.0.1:27017/userdb")
    .then(() => {
    mongoose.set({ debug: true });
    console.log("MongoDB connected");
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
})
    .catch((err) => console.error("MongoDB connection error:", err));
//# sourceMappingURL=server.js.map