import type { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

import userModel from "../models/userModels.js";
import { generateOTP, sendOTP } from "../utils/OTP.js";

dotenv.config();

if (!process.env.PRIVATE_KEY) {
  throw new Error("Missing PRIVATE_KEY in environment variables.");
}

const sanitizeUser = (user: any) => {
  const obj = user.toObject();
  delete obj.password;
  delete obj.OTP;
  delete obj.otpExpires;
  return obj;
};

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, name, city, gender, country, state, password } = req.body;

    if (
      !email ||
      !name ||
      !gender ||
      !city ||
      !country ||
      !state ||
      !password
    ) {
      return res
        .status(400)
        .json({ code: 400, message: "All fields are required", data: [] });
    }

    const temail = email.trim();
    const exists = await userModel.findOne({ email: temail });

    if (exists) {
      return res
        .status(400)
        .json({ code: 400, message: "User already exists", data: [] });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      email: temail,
      name,
      gender,
      city,
      country,
      state,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({
      code: 201,
      message: "User registered successfully",
      data: sanitizeUser(newUser),
    });
  } catch (error) {
    next(error);
  }
};

export const generateOtp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;

  try {
    let user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ code: 404, message: "User not found", data: [] });
    }

    const OTP = generateOTP();
    console.log(generateOTP)

    const expiry = new Date(Date.now() + 5 * 60 * 1000);

    user.OTP = OTP;
    user.otpExpires = expiry;

    await user.save();
    await sendOTP(email, OTP);

    return res.status(200).json({
      code: 200,
      message: "OTP sent successfully",
      data: [],
    });
  } catch (error) {
    next(error);
  }
};

export const verifyOTP = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, OTP } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (
      !user ||
      user.OTP !== OTP ||
      !user.otpExpires ||
      user.otpExpires < new Date()
    ) {
      return res
        .status(400)
        .json({ code: 400, message: "Invalid or expired OTP", data: [] });
    }

    user.OTP = null;
    user.otpExpires = null;
    await user.save();

    return res
      .status(200)
      .json({ code: 200, message: "OTP verified successfully", data: [] });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, OTP } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ code: 404, message: "User not found" });
    }

    if (
      !user.OTP ||
      user.OTP !== OTP ||
      !user.otpExpires ||
      user.otpExpires < new Date()
    ) {
      return res
        .status(400)
        .json({ code: 400, message: "Invalid or expired OTP" });
    }

    user.OTP = null;
    user.otpExpires = null;
    await user.save();

    const token = jwt.sign(
      { _id: user._id },
      process.env.PRIVATE_KEY as string,
      {
        expiresIn: (process.env.ACCESS_TOKEN_EXPIRY as "1d") || "1d",
      }
    );

    return res.status(200).json({
      code: 200,
      message: "Login successful",
      data: sanitizeUser(user),
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const listUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await userModel
      .find()
      .populate("country", "countryName")
      .populate("state", "stateName")
      .populate("city", "cityName")
      .exec();

    const usersWithoutPasswords = users.map(sanitizeUser);

    return res.status(200).json({
      code: 200,
      message: "Successfully listed",
      data: usersWithoutPasswords,
    });
  } catch (error) {
    next(error);
  }
};

export const userDetail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ code: 400, message: "Email is required", data: [] });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ code: 404, message: "User not found", data: [] });
    }

    return res.status(200).json({
      code: 200,
      message: "Details fetched successfully",
      data: sanitizeUser(user),
    });
  } catch (error) {
    next(error);
  }
};

export const editUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, name, gender, city, state, country } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ code: 400, message: "Email is required", data: [] });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ code: 404, message: "User not found", data: [] });
    }

    if (name) user.name = name;
    if (gender) user.gender = gender;
    if (city) user.city = city;
    if (country) user.country = country;
    if (state) user.state = state;

    await user.save();

    return res.status(200).json({
      code: 200,
      message: "User updated successfully",
      data: sanitizeUser(user),
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ code: 400, message: "Email is required", data: [] });
    }

    const deleted = await userModel.findOneAndDelete({ email });

    if (!deleted) {
      return res
        .status(404)
        .json({ code: 404, message: "User not found", data: [] });
    }

    return res.status(200).json({
      code: 200,
      message: "User deleted successfully",
      data: [],
    });
  } catch (error) {
    next(error);
  }
};
