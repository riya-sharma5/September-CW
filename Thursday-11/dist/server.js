import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import countryRoutes from "./routes/countryRoutes.js";
import stateRoutes from './routes/stateRoutes.js';
import cityRoutes from './routes/cityRoutes.js';
const app = express();
const PORT = 3000;
app.use(bodyParser.json());
app.use(cors());
app.use("/country", countryRoutes);
app.use('/city', cityRoutes);
app.use('/state', stateRoutes);
mongoose
    .connect("mongodb://127.0.0.1:27017/datadb")
    .then(() => {
    console.log("mongodb connected");
    app.listen(PORT, () => {
        console.log(`server running at http://localhost:${PORT}`);
    });
})
    .catch((err) => {
    console.error("mongodb connection error:", err);
});
//# sourceMappingURL=server.js.map