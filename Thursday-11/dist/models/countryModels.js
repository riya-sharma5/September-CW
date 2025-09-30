"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.countryModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const countrySchema = new mongoose_1.default.Schema({
    countryName: { type: String, required: true, unique: true },
});
const countryModel = mongoose_1.default.model("country", countrySchema);
exports.countryModel = countryModel;
//# sourceMappingURL=countryModels.js.map