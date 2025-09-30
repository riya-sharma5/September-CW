"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const countryRoutes_1 = __importDefault(require("./routes/countryRoutes"));
const stateRoutes_1 = __importDefault(require("./routes/stateRoutes"));
const cityRoutes_1 = __importDefault(require("./routes/cityRoutes"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use("/country", countryRoutes_1.default);
app.use('/city', cityRoutes_1.default);
app.use('/state', stateRoutes_1.default);
mongoose_1.default
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