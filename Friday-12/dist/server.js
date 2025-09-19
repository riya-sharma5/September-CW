import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import countryRoutes from "./routes/countryRoutes.js";
import stateRoutes from './routes/stateRoutes.js';
import cityRoutes from './routes/cityRoutes.js';
import studentRoutes from "./routes/studentRoutes.js";
const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());
app.use("/student", studentRoutes);
app.use("/country", countryRoutes);
app.use("/state", stateRoutes);
app.use("/city", cityRoutes);
mongoose
    .connect("mongodb://127.0.0.1:27017/studentdb")
    .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
})
    .catch((err) => console.error("MongoDB connection error:", err));
//# sourceMappingURL=server.js.map