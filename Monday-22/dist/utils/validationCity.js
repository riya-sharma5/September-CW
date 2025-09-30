"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCitiesValidation = exports.listCityValidation = exports.deleteCityValidation = exports.updateCityValidation = exports.createCityValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createCityValidation = joi_1.default.object({
    cityName: joi_1.default.string().required(),
    stateId: joi_1.default.string().required()
});
exports.updateCityValidation = joi_1.default.object({
    cityName: joi_1.default.string().required(),
    _id: joi_1.default.string().required()
});
exports.deleteCityValidation = joi_1.default.object({
    cityName: joi_1.default.string().required()
});
exports.listCityValidation = joi_1.default.object({
    stateId: joi_1.default.string().required()
});
exports.getAllCitiesValidation = joi_1.default.object({
    page: joi_1.default.number().integer().min(1).default(1).optional(),
    limit: joi_1.default.number().integer().min(1).max(100).default(20).optional()
});
//# sourceMappingURL=validationCity.js.map