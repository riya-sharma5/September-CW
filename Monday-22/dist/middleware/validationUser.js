"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listUserValidation = exports.editUserValidation = exports.deleteUserValidation = exports.detailUserValidation = exports.changeUserValidation = exports.resetUserValidation = exports.loginUserValidation = exports.verifyUserValidation = exports.generateUserValidation = exports.createUserValidation = exports.validateParams = exports.validateQuery = exports.validateRequest = void 0;
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
const validateParams = (schema) => {
    return async (req, res, next) => {
        try {
            let result = await schema.validateAsync(req.params);
            req.params = result;
            next();
        }
        catch (error) {
            return res.status(400).json({
                error: error?.details ? error?.details[0]?.message : "something went wrong",
            });
        }
    };
};
exports.validateParams = validateParams;
exports.createUserValidation = joi_1.default.object({
    name: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required(),
    country: joi_1.default.string().required(),
    profilePhotoURL: joi_1.default.string().optional(),
    city: joi_1.default.string().required(),
    state: joi_1.default.string().required(),
    pincode: joi_1.default.string().required(),
    gender: joi_1.default.string().required(),
});
exports.generateUserValidation = joi_1.default.object({
    email: joi_1.default.string().email().required(),
});
exports.verifyUserValidation = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    OTP: joi_1.default.string().required(),
});
exports.loginUserValidation = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required(),
});
exports.resetUserValidation = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    OTP: joi_1.default.string().required(),
    newPassword: joi_1.default.string().required(),
});
exports.changeUserValidation = joi_1.default.object({
    oldPassword: joi_1.default.string().required(),
    newPassword: joi_1.default.string().required(),
    confirmPassword: joi_1.default.string().required(),
});
exports.detailUserValidation = joi_1.default.object({
    email: joi_1.default.string().email().required(),
});
exports.deleteUserValidation = joi_1.default.object({
    email: joi_1.default.string().email().required(),
});
exports.editUserValidation = joi_1.default.object({
    name: joi_1.default.string().optional(),
    gender: joi_1.default.string().optional(),
    email: joi_1.default.string().optional(),
    city: joi_1.default.string().optional(),
    country: joi_1.default.string().optional(),
    state: joi_1.default.string().optional(),
    profilePhotoURL: joi_1.default.string().optional(),
});
exports.listUserValidation = joi_1.default.object({
    page: joi_1.default.number().integer().min(1).default(1).optional(),
    limit: joi_1.default.number().integer().min(1).max(100).default(20).optional()
});
//# sourceMappingURL=validationUser.js.map