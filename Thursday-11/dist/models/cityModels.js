"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cityModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const citySchema = new mongoose_1.default.Schema({
    cityName: { type: String, required: true, unique: true },
    stateId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "state",
        required: true,
    },
});
const cityModel = mongoose_1.default.model("city", citySchema);
exports.cityModel = cityModel;
//# sourceMappingURL=cityModels.js.map