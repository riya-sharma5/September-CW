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

    const dataPipeline: any[] = [
      { $match: { expiry: { $gte: now } } },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $match: {
          "user.name": { $regex: search, $options: "i" },
        },
      },
    
      { $skip: skip },
      { $limit: limit },
      {
        $project: {
          _id: 1,
          expiry: 1,
          userId: "$user._id",
          name: "$user.name",
          email: "$user.email",
          gender: "$user.gender",
          pincode: "$user.pincode",
        },
      },
    ];

    const countPipeline: any[] = [
      { $match: { expiry: { $gte: now } } },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $match: {
          "user.name": { $regex: search, $options: "i" },
        },
      },
      { $count: "total" },
    ];

    const [data, countResult] = await Promise.all([
      availabilityModel.aggregate(dataPipeline),
      availabilityModel.aggregate(countPipeline),
    ]);

    const total = countResult[0]?.total || 0;

    return res.status(200).json({
      code: 200,
      message: "Available users fetched successfully",
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
      data,
    });
  } catch (error) {
    next(error);
  }
};