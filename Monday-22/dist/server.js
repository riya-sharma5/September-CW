"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const countryRoutes_1 = __importDefault(require("./routes/countryRoutes"));
const stateRoutes_1 = __importDefault(require("./routes/stateRoutes"));
const cityRoutes_1 = __importDefault(require("./routes/cityRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
const errorHandler_1 = require("./middleware/errorHandler");
const body_parser_1 = __importDefault(require("body-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: false }));
const PORT = 9595;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use("/user", userRoutes_1.default);
app.use("/country", countryRoutes_1.default);
app.use("/state", stateRoutes_1.default);
app.use("/city", cityRoutes_1.default);
app.use(errorHandler_1.errorHandler);
mongoose_1.default
    .connect("mongodb://127.0.0.1:27017/userdb")
    .then(() => {
    mongoose_1.default.set({ debug: true });
    console.log("MongoDB connected");
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
})
    .catch((err) => console.error("MongoDB connection error:", err));
//# sourceMappingURL=server.js.map