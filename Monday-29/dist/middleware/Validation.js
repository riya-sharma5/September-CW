"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.yearValidation = exports.languageValidation = exports.genresValidation = exports.validateQuery = exports.validateRequest = void 0;
const joi_1 = __importDefault(require("joi"));
const validateRequest = (schema) => {
    return async (req, res, next) => {
        try {
            let result = await schema.validateAsync(req.body);
            req.body = result;
            next();
        }
        catch (error) {
            return res.status(400).json({
                error: error.details[0]?.message,
            });
        }
    };
};
exports.validateRequest = validateRequest;
const validateQuery = (schema) => {
    return async (req, res, next) => {
        try {
            let result = await schema.validateAsync(req.query);
            req.query = result;
            next();
        }
        catch (error) {
            return res.status(400).json({
                error: error?.details ? error?.details[0]?.message : "something went wrong",
            });
        }
    };
};
exports.validateQuery = validateQuery;
exports.genresValidation = joi_1.default.object({
    page: joi_1.default.number().integer().min(1).default(1).optional(),
    limit: joi_1.default.number().integer().min(1).max(100).default(20).optional(),
    minRating: joi_1.default.number().min(0).max(10).default(0).optional()
});
exports.languageValidation = joi_1.default.object({
    page: joi_1.default.number().integer().min(1).default(1).optional(),
    limit: joi_1.default.number().integer().min(1).max(100).default(20).optional(),
    minRating: joi_1.default.number().min(0).max(10).default(0).optional()
});
exports.yearValidation = joi_1.default.object({
    page: joi_1.default.number().integer().min(1).default(1).optional(),
    limit: joi_1.default.number().integer().min(1).max(100).default(20).optional(),
    year: joi_1.default.number().integer().required()
});
//# sourceMappingURL=Validation.js.map