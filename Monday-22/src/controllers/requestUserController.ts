import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import requestUserModel, {statusType} from "../models/requestUserModel";
import availabilityModel from "../models/availableModels";


export const sendRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { fromUserId, toUserId, content } = req.body;

    if (fromUserId === toUserId) {
      return res
        .status(400)
        .json({ code: 400, message: "You cannot send a request to yourself" });
    }

    const now = new Date();
    const recipientAvailability = await availabilityModel.findOne({
      userId: toUserId,
      expiry: { $gte: now },
    });

    if (!recipientAvailability) {
      return res.status(400).json({
        code: 400,
        message: "Recipient is not available to receive requests.",
      });
    }

    const newRequest = await requestUserModel.create({
      fromUserId,
      toUserId,
      content,
    });

    return res.status(201).json({
      code: 201,
      message: "Request sent successfully",
      data: newRequest,
    });
  } catch (error) {
    next(error);
  }
};

export const requestList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res
        .status(400)
        .json({ code: 400, message: "userId is required in body" });
    }

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const search = (req.query.search as string)?.trim() || "";
    const searchRegex = search ? new RegExp(search, "i") : /.*/;

    const sentRequestsPipeline: any[] = [
      {
        $match: {
          fromUserId: new mongoose.Types.ObjectId(userId),
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

    const receivedRequestsPipeline: any[] = [
      {
        $match: {
          toUserId: new mongoose.Types.ObjectId(userId),
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
      requestUserModel.aggregate(sentRequestsPipeline),
      requestUserModel.aggregate(receivedRequestsPipeline),
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
  } catch (error) {
    console.error("Error fetching request list:", error);
    next(error);
  }
};

export const acceptRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { requestId, userId } = req.body;

    const request = await requestUserModel.findById(requestId);
    if (!request) {
      return res.status(404).json({ code: 404, message: "Request not found" });
    }

    if (request.toUserId.toString() !== userId) {
      return res.status(403).json({
        code: 403,
        message: "You are not authorized to accept this request",
      });
    }

    const availability = await availabilityModel.findOne({
      userId,
      expiry: { $gte: new Date() },
    });

    if (!availability) {
      return res.status(400).json({
        code: 400,
        message: "You are no longer available to accept requests",
      });
    }

    request.status = statusType.accepted;
    await request.save();

    return res.status(200).json({
      code: 200,
      message: "Request accepted successfully",
      data: request,
    });
  } catch (error) {
    next(error);
  }
};

export const rejectRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { requestId, userId } = req.body;

    const request = await requestUserModel.findById(requestId);
    if (!request) {
      return res.status(404).json({ code: 404, message: "Request not found" });
    }

    if (request.toUserId.toString() !== userId) {
      return res.status(403).json({
        code: 403,
        message: "You are not authorized to reject this request",
      });
    }

    const availability = await availabilityModel.findOne({
      userId,
      expiry: { $gte: new Date() },
    });

    if (!availability) {
      return res.status(400).json({
        code: 400,
        message: "You are no longer available to reject requests",
      });
    }

    request.status = statusType.rejected;
    await request.save();

    return res.status(200).json({
      code: 200,
      message: "Request rejected successfully",
      data: request,
    });
  } catch (error) {
    next(error);
  }
};
