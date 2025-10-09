"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rejectRequest = exports.acceptRequest = exports.requestList = exports.sendRequest = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const requestUserModel_1 = __importStar(require("../models/requestUserModel"));
const availableModels_1 = __importDefault(require("../models/availableModels"));
const sendRequest = async (req, res, next) => {
    try {
        const { fromUserId, toUserId, content } = req.body;
        if (fromUserId === toUserId) {
            return res
                .status(400)
                .json({ code: 400, message: "You cannot send a request to yourself" });
        }
        const now = new Date();
        const recipientAvailability = await availableModels_1.default.findOne({
            userId: toUserId,
            expiry: { $gte: now },
        });
        if (!recipientAvailability) {
            return res.status(400).json({
                code: 400,
                message: "Recipient is not available to receive requests.",
            });
        }
        const newRequest = await requestUserModel_1.default.create({
            fromUserId,
            toUserId,
            content,
        });
        return res.status(201).json({
            code: 201,
            message: "Request sent successfully",
            data: newRequest,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.sendRequest = sendRequest;
const requestList = async (req, res, next) => {
    try {
        const { userId } = req.body;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const search = req.query.search?.trim() || "";
        const searchRegex = search ? new RegExp(search, "i") : /.*/;
        const sentRequestsPipeline = [
            {
                $match: {
                    fromUserId: new mongoose_1.default.Types.ObjectId(userId),
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "toUserId",
                    foreignField: "_id",
                    as: "toUser",
                },
            },
            {
                $unwind: {
                    path: "$toUser",
                },
            },
            {
                $match: {
                    "toUser.name": { $regex: searchRegex },
                },
            },
            {
                $project: {
                    content: 1,
                    status: 1,
                    toUserId: "$toUser._id",
                    name: "$toUser.name",
                    email: "$toUser.email",
                },
            },
            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: limit },
        ];
        const receivedRequestsPipeline = [
            {
                $match: {
                    toUserId: new mongoose_1.default.Types.ObjectId(userId),
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "fromUserId",
                    foreignField: "_id",
                    as: "fromUser",
                },
            },
            {
                $unwind: {
                    path: "$fromUser",
                },
            },
            {
                $match: {
                    "fromUser.name": { $regex: searchRegex },
                },
            },
            {
                $project: {
                    content: 1,
                    status: 1,
                    fromUserId: "$fromUser._id",
                    name: "$fromUser.name",
                    email: "$fromUser.email",
                },
            },
            { $skip: skip },
            { $limit: limit },
        ];
        const [sentRequests, receivedRequests] = await Promise.all([
            requestUserModel_1.default.aggregate(sentRequestsPipeline),
            requestUserModel_1.default.aggregate(receivedRequestsPipeline),
        ]);
        return res.status(200).json({
            code: 200,
            message: "Request lists fetched successfully",
            data: {
                sentRequests,
                receivedRequests,
                pagination: {
                    page,
                    limit,
                },
            },
        });
    }
    catch (error) {
        console.error("Error fetching request list:", error);
        next(error);
    }
};
exports.requestList = requestList;
const acceptRequest = async (req, res, next) => {
    try {
        const { requestId, userId } = req.body;
        const request = await requestUserModel_1.default.findById(requestId);
        if (!request) {
            return res.status(404).json({ code: 404, message: "Request not found" });
        }
        if (request.toUserId.toString() !== userId) {
            return res.status(403).json({
                code: 403,
                message: "You are not authorized to accept this request",
            });
        }
        const availability = await availableModels_1.default.findOne({
            userId,
            expiry: { $gte: new Date() },
        });
        if (!availability) {
            return res.status(400).json({
                code: 400,
                message: "You are no longer available to accept requests",
            });
        }
        request.status = requestUserModel_1.statusType.accepted;
        await request.save();
        return res.status(200).json({
            code: 200,
            message: "Request accepted successfully",
            data: request,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.acceptRequest = acceptRequest;
const rejectRequest = async (req, res, next) => {
    try {
        const { requestId, userId } = req.body;
        const request = await requestUserModel_1.default.findById(requestId);
        if (!request) {
            return res.status(404).json({ code: 404, message: "Request not found" });
        }
        if (request.toUserId.toString() !== userId) {
            return res.status(403).json({
                code: 403,
                message: "You are not authorized to reject this request",
            });
        }
        const availability = await availableModels_1.default.findOne({
            userId,
            expiry: { $gte: new Date() },
        });
        if (!availability) {
            return res.status(400).json({
                code: 400,
                message: "You are no longer available to reject requests",
            });
        }
        request.status = requestUserModel_1.statusType.rejected;
        await request.save();
        return res.status(200).json({
            code: 200,
            message: "Request rejected successfully",
            data: request,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.rejectRequest = rejectRequest;
//# sourceMappingURL=requestUserController.js.map