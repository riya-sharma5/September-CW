"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listCountryValidation = exports.deleteCountryValidation = exports.updateCountryValidation = exports.createCountryValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createCountryValidation = joi_1.default.object({
    countryName: joi_1.default.string().required()
});
exports.updateCountryValidation = joi_1.default.object({
    countryName: joi_1.default.string().required(),
    _id: joi_1.default.string().required()
});
exports.deleteCountryValidation = joi_1.default.object({
    countryName: joi_1.default.string().required()
});
exports.listCountryValidation = joi_1.default.object({
    page: joi_1.default.number().integer().min(1).default(1).optional(),
    limit: joi_1.default.number().integer().min(1).max(100).default(20).optional()
});
//# sourceMappingURL=validationCountry.js.map