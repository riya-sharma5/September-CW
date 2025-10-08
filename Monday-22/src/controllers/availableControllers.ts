import { Request, Response, NextFunction } from "express";
import availabilityModel from "../models/availableModels";
import mongoose from "mongoose";

export const createAvailability = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

    const userObjectId = new mongoose.Types.ObjectId(userId);

    const existingAvailability = await availabilityModel.findOne({
      userId: userObjectId,
    });

    let availabilityDoc;

    if (existingAvailability) {
      existingAvailability.expiry = expiryDate;
      availabilityDoc = await existingAvailability.save();
    } else {
      availabilityDoc = await availabilityModel.create({
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
  } catch (error) {
    next(error);
  }
};

export const availableUserList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const now = new Date();
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    const search = (req.query.search as string)?.trim().toLowerCase() || "";

    const query: any = {
      expiry: { $gt: now },
    };

    const availableUsers = await availabilityModel
      .find(query)
      .populate({
        path: "userId",
        match: {
          name: { $regex: search, $options: 'i'  },
        },
        select: "name email gender",
      })
      .sort({ expiry: 1 })
      .skip(skip)
      .limit(limit)
      .exec();

    const filteredUsers = availableUsers.filter((doc) => doc.userId);

    return res.status(200).json({
      code: 200,
      message: "Available users fetched successfully",
      pagination: {
        total: filteredUsers.length,
        page,
        limit,
        pages: Math.ceil(filteredUsers.length / limit),
      },
      data: filteredUsers,
    });
  } catch (error) {
    next(error);
  }
};
