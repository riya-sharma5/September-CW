import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import requestUserModel, {
  preferenceType,
  statusType,
} from "../models/requestUserModel";
import availabilityModel from "../models/availableModels";

export const sendRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { fromUserId, toUserId, content, additionalPassengers } = req.body;

    if (!mongoose.Types.ObjectId.isValid(toUserId)) {
      return res
        .status(400)
        .json({ code: 400, message: "Invalid receiver ID" });
    }

    if (fromUserId.toString() === toUserId) {
      return res
        .status(400)
        .json({ code: 400, message: "You cannot send a request to yourself" });
    }

    const validPreferences = Object.values(preferenceType);
    if (!validPreferences.includes(content)) {
      return res
        .status(400)
        .json({ code: 400, message: "Invalid preference (content) value" });
    }

    if (content === preferenceType["I can Drive"]) {
      console.log(content, "content :", preferenceType["I can Drive"]);
      console.log("additionalP", additionalPassengers);
      console.log(Number.isInteger(additionalPassengers));

      if (
        !additionalPassengers ||
        !Number(additionalPassengers) ||
        additionalPassengers < 0
      ) {
        return res.status(400).json({
          code: 400,
          message:
            "additionalPassengers must be a non-negative integer when 'I can Drive' is selected",
        });
      }
    }

    if (content === preferenceType["I need a ride"] && additionalPassengers) {
      return res.status(400).json({
        code: 400,
        message:
          "additionalPassengers should not be provided when 'I Need a Ride' is selected",
      });
    }

    const receiverAvailability = await availabilityModel.findOne({
      userId: toUserId,
      expiry: { $gte: new Date() },
    });

    if (!receiverAvailability) {
      return res.status(400).json({
        code: 400,
        message: "Receiver is not currently available to receive requests.",
      });
    }

    const existingRequest = await requestUserModel.findOne({
      fromUserId,
      toUserId,
      content,
      status: statusType.pending,
    });

    if (existingRequest) {
      return res.status(400).json({
        code: 400,
        message:
          "You have already sent a similar request that is still pending",
      });
    }

    const requestData: any = {
      fromUserId,
      toUserId,
      content,
      status: statusType.pending,
    };

    if (content === preferenceType["I can Drive"]) {
      requestData.additionalPassengers = additionalPassengers;
    }

    const newRequest = await requestUserModel.create(requestData);

    return res.status(201).json({
      code: 201,
      message: "Request sent successfully",
      data: newRequest,
    });
  } catch (error) {
    console.error("Error in sendRequest:", error);
    next(error);
  }
};

export const requestList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, listType, statusType } = req.body;

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    const search = (req.query.search as string)?.trim() || "";
    const searchRegex = search ? new RegExp(search, "i") : null;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ code: 400, message: "Invalid userId" });
    }

    if (!["0", "1"].includes(listType)) {
      return res
        .status(400)
        .json({
          code: 400,
          message: "listType must be '0' (sent) or '1' (received)",
        });
    }

    if (
      !statusType &&
      statusType !== null &&
      statusType !== "" &&
      !["0", "3"].includes(statusType.toString())
    ) {
      return res.status(400).json({
        code: 400,
        message: "statusType must be either 0 (pending) or 3 (closed)",
      });
    }

    const match: any = {
      [listType === "0" ? "fromUserId" : "toUserId"]:
        new mongoose.Types.ObjectId(userId),
    };

    if (!statusType && statusType !== "" && statusType !== null) {
      match.status = parseInt(statusType, 10);
    }

    const pipeline: any[] = [
      { $match: match },
      {
        $lookup: {
          from: "users",
          localField: listType === "0" ? "toUserId" : "fromUserId",
          foreignField: "_id",
          as: "userInfo",
        },
      },
      { $unwind: "$userInfo" },
    ];

    if (searchRegex) {
      pipeline.push({
        $match: {
          "userInfo.name": { $regex: searchRegex },
        },
      });
    }

    pipeline.push({
      $project: {
        _id: 1,
        content: 1,
        status: 1,
        userId: "$userInfo._id",
        name: "$userInfo.name",
        email: "$userInfo.email",
      },
    });

    pipeline.push({ $skip: skip }, { $limit: limit });

    const data = await requestUserModel.aggregate(pipeline);

    const totalCount = await requestUserModel.countDocuments(match);

    return res.status(200).json({
      code: 200,
      message: "Request list fetched successfully",
      data: {
        pagination: {
          data,
          page,
          limit,
          totalPages: Math.ceil(totalCount / limit),
          totalCount,
        },
      },
    });
  } catch (error) {
    console.error("Error in requestList:", error);
    next(error);
  }
};

export const acceptRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { requestId, userId, content, additionalPassengers } = req.body;

    if (
      !mongoose.Types.ObjectId.isValid(requestId) ||
      !mongoose.Types.ObjectId.isValid(userId)
    ) {
      return res
        .status(400)
        .json({ code: 400, message: "Invalid requestId or userId" });
    }

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

    const validResponseTypes = ["0", "1", "2", "3", "4", "5"];
    if (!validResponseTypes.includes(content)) {
      return res
        .status(400)
        .json({ code: 400, message: "Invalid response (content) value" });
    }

    if (request.content === preferenceType["I can Drive"]) {
      if (
        !additionalPassengers ||
        !Number(additionalPassengers) ||
        additionalPassengers < 0
      ) {
        return res.status(400).json({
          code: 400,
          message: "additionalPassengers must be a 'I can Drive'",
        });
      }

      request.additionalPassengers = additionalPassengers;
    } else if (additionalPassengers) {
      return res.status(400).json({
        code: 400,
        message:
          "additionalPassengers should not provided when the sender selected 'I Need a Ride'",
      });
    }

    const existingAccepted = await requestUserModel.findOne({
      fromUserId: request.fromUserId,
      toUserId: request.toUserId,
      status: statusType.accepted,
      _id: { $ne: requestId },
    });

    if (existingAccepted) {
      return res.status(400).json({
        code: 400,
        message: "accepted request already exists between these users.",
      });
    }

    ///request.status = statusType.accepted;
    request.status = statusType.closed;
    await request.save();

    return res.status(200).json({
      code: 200,
      message: "Request accepted successfully",
      data: request,
    });
  } catch (error) {
    console.error("Error in acceptRequest:", error);
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

    if (
      !mongoose.Types.ObjectId.isValid(requestId) ||
      !mongoose.Types.ObjectId.isValid(userId)
    ) {
      return res
        .status(400)
        .json({ code: 400, message: "Invalid requestId or userId" });
    }

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

    //request.status = statusType.rejected;
    request.status = statusType.closed;
    console.log("request -----------------", request);
    await request.save();

    return res.status(200).json({
      code: 200,
      message: "Request rejected successfully",
      data: request,
    });
  } catch (error) {
    console.error("Error in rejectRequest:", error);
    next(error);
  }
};

export const detailById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.id;
    console.log("userId", req.params);
    if (!mongoose.Types.ObjectId.isValid(userId!)) {
      return res.status(400).json({ code: 400, message: "Invalid userId" });
    }
    const requests = await requestUserModel.aggregate([
      {
        $match: {
          $or: [
            { fromUserId: new mongoose.Types.ObjectId(userId) },
            { toUserId: new mongoose.Types.ObjectId(userId) },
          ],
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
        $lookup: {
          from: "users",
          localField: "toUserId",
          foreignField: "_id",
          as: "toUser",
        },
      },
      { $unwind: "$fromUser" },
      { $unwind: "$toUser" },
      {
        $project: {
          _id: 1,
          content: 1,
          status: 1,
          additionalPassengers: 1,
          _fromUserId: "$fromUser._id",
          fromUserName: "$fromUser.name",
          fromUseremail: "$fromUser.email",
          _toUserId: "$toUser._id",
          tpUserName: "$toUser.name",
          toUserEmail: "$toUser.email",
        },
      },
    ]);

    return res.status(200).json({
      code: 200,
      message: "Request details fetched successfully",
      data: requests,
    });
  } catch (error) {
    console.error("Error in detailById:", error);
    next(error);
  }
};
