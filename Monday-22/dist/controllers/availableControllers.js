"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAvailability = void 0;
const availableModels_1 = __importDefault(require("../models/availableModels"));
const mongoose_1 = __importDefault(require("mongoose"));
const createAvailability = async (req, res, next) => {
    try {
        const { userId, expiry } = req.body;
        const expiryDate = new Date(expiry);
        const now = new Date();
        if (isNaN(expiryDate.getTime())) {
            return res.status(400).json({
                code: 400,
                message: "Invalid expiry date format. Use ISO 8601 format.",
            });
        }
        const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000);
        if (expiryDate < oneHourFromNow) {
            return res.status(400).json({
                code: 400,
                message: "Availability must be at least one hour from now.",
            });
        }
        const userObjectId = new mongoose_1.default.Types.ObjectId(userId);
        const existingAvailability = await availableModels_1.default.findOne({
            userId: userObjectId,
        });
        let availabilityDoc;
        if (existingAvailability) {
            existingAvailability.expiry = expiryDate;
            availabilityDoc = await existingAvailability.save();
        }
        else {
            availabilityDoc = await availableModels_1.default.create({
                userId: userObjectId,
                expiry: expiryDate,
            });
        }
        const isAvailable = expiryDate > now;
        const statusCode = existingAvailability ? 200 : 201;
        return res.status(statusCode).json({
            code: statusCode,
            message: existingAvailability
                ? "Availability updated"
                : "Availability created",
            data: {
                ...availabilityDoc.toObject(),
                status: isAvailable ? "available" : "not available",
            },
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createAvailability = createAvailability;
//# sourceMappingURL=availableControllers.js.map