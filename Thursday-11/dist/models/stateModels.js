"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stateModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const stateSchema = new mongoose_1.default.Schema({
    stateName: { type: String, required: true, unique: true },
    countryId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "country",
        required: true,
    },
});
const stateModel = mongoose_1.default.model("state", stateSchema);
exports.stateModel = stateModel;
//# sourceMappingURL=stateModels.js.map