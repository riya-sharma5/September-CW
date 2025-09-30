"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDb = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv = __importStar(require("dotenv"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const mongoose_1 = __importDefault(require("mongoose"));
const moviesRoutes_1 = __importDefault(require("./routes/moviesRoutes"));
dotenv.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 9004;
app.use((0, cors_1.default)({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true, limit: "16kb" }));
app.use("/api", moviesRoutes_1.default);
app.use(errorHandler_1.default);
const connectDb = async () => {
    try {
        await mongoose_1.default.connect("mongodb+srv://riyasharma978715_db_user:riya%401234567890@cluster0.epfeyjp.mongodb.net/sample_mflix?retryWrites=true&w=majority");
        mongoose_1.default.set("debug", true);
        console.log("MongoDB connected");
        app.listen(PORT, () => {
            console.log(` Server running at http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error(" MongoDB connection error:", error);
        process.exit(1);
    }
};
exports.connectDb = connectDb;
(0, exports.connectDb)();
//# sourceMappingURL=server.js.map