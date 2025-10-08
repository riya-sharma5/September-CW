"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.availableUserListValidation = exports.createAvailabilityValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createAvailabilityValidation = joi_1.default.object({
    userId: joi_1.default.string().required(),
    expiry: joi_1.default.string().required()
});
exports.availableUserListValidation = joi_1.default.object({
    page: joi_1.default.number().integer().min(1).default(1).optional(),
    limit: joi_1.default.number().integer().min(1).max(100).default(20).optional(),
    search: joi_1.default.string().optional()
});
//# sourceMappingURL=availabilityValidation.js.map