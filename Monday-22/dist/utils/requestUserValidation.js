"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rejectValidation = exports.acceptValidation = exports.listValidation = exports.sendRequestValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.sendRequestValidation = joi_1.default.object({
    fromUserId: joi_1.default.string().required(),
    toUserId: joi_1.default.string().required(),
    content: joi_1.default.string().required()
});
exports.listValidation = joi_1.default.object({
    page: joi_1.default.number().integer().min(1).default(1).optional(),
    limit: joi_1.default.number().integer().min(1).max(100).default(20).optional(),
    search: joi_1.default.string().optional()
});
exports.acceptValidation = joi_1.default.object({
    requestId: joi_1.default.string().required(),
    userId: joi_1.default.string().required()
});
exports.rejectValidation = joi_1.default.object({
    requestId: joi_1.default.string().required(),
    userId: joi_1.default.string().required()
});
//# sourceMappingURL=requestUserValidation.js.map