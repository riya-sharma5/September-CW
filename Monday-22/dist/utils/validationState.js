"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllStatesValidation = exports.listStateValidation = exports.deleteStateValidation = exports.updateStateValidation = exports.createStateValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createStateValidation = joi_1.default.object({
    stateName: joi_1.default.string().required(),
    countryId: joi_1.default.string().required()
});
exports.updateStateValidation = joi_1.default.object({
    stateName: joi_1.default.string().required(),
    _id: joi_1.default.string().required()
});
exports.deleteStateValidation = joi_1.default.object({
    stateName: joi_1.default.string().required()
});
exports.listStateValidation = joi_1.default.object({
    countryId: joi_1.default.string().required()
});
exports.getAllStatesValidation = joi_1.default.object({
    page: joi_1.default.number().integer().min(1).default(1).optional(),
    limit: joi_1.default.number().integer().min(1).max(100).default(20).optional()
});
//# sourceMappingURL=validationState.js.map