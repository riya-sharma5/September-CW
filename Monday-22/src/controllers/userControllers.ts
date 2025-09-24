import type { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import moment from "moment";
import { createUserValidation, changeValidation, verifyUserValidation, generateValidation, loginValidation, resetValidation, detailValidation, deleteValidation} from "../middleware/validation.js";
import userModel from "../models/userModels.js";

import { generateOTP, sendOTP } from "../utils/OTP.js";

dotenv.config();

if (!process.env.PRIVATE_KEY) {
  throw new Error("Missing PRIVATE_KEY in environment variables.");
}

const genderMap: Record<number, string> = {
  0: "Male",
  1: "Female",
  2: "Others",
};

const sanitizeUser = (user: any) => {
  const obj = user.toObject();
  delete obj.password;
  delete obj.OTP;
  delete obj.otpExpires;

  if (typeof obj.gender === "number") {
    obj.gender = genderMap[obj.gender] ?? "Unknown";
  }

  return obj;
};

const tEmail = (email: string) => email.trim().toLowerCase();

const isOTPValid = (user: any, inputOTP: string) => {
  if (user.OTP !== inputOTP) {
    return { valid: false, reason: "invalid" };
  }

  if (new Date(user.otpExpires).getTime() <= Date.now()) {
    return { valid: false, reason: "expired" };
  }

  return { valid: true };
};

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {  
     await createUserValidation.validateAsync(req.body);
 
    const {
      email,
      name,
      city,
      gender,
      country,
      pincode,
      state,
      password,
      profilePictureURL,
    } = req.body;

    const temail = tEmail(email);
    const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!temail.match(emailregex)) {
      return res
        .status(400)
        .json({ code: 400, message: "Invalid email format", data: [] });
    }

    if (![0, 1, 2].includes(gender)) {
      return res
        .status(400)
        .json({ code: 400, message: "Invalid gender value", data: [] });
    }

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
      pincode,
      city,
      country,
      profilePictureURL,
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
  try {
    await generateValidation.validateAsync(req.body);
    const { email } = req.body;
    const user = await userModel.findOne({ email: tEmail(email) });

    if (!user) {
      return res
        .status(404)
        .json({ code: 404, message: "User not found", data: [] });
    }

    const OTP = generateOTP();
    const expiry = moment().add(2, "minutes").toDate();

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
  try {
   await verifyUserValidation.validateAsync(req.body);
    const { email, OTP } = req.body;
    
    const user = await userModel.findOne({ email: tEmail(email) });
    console.log("otp in body :", OTP);
    if (!user || !isOTPValid(user, OTP)) {
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
  try {
    await loginValidation.validateAsync(req.body);
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: tEmail(email) });

    if (!user) {
      return res.status(404).json({ code: 404, message: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res
        .status(401)
        .json({ code: 401, message: "Incorrect password", data: [] });
    }

    await user.save();

    const token = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.PRIVATE_KEY as string,
      {
        expiresIn: (process.env.ACCESS_TOKEN_EXPIRY as "1d") ?? "1d",
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
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const [users, totalUsers] = await Promise.all([
      userModel
        .find()
        .populate("country", "countryName")
        .populate("state", "stateName")
        .populate("city", "cityName")
        .skip(skip)
        .limit(limit)
        .exec(),
      userModel.countDocuments(),
    ]);

    const usersWithoutPasswords = users.map(sanitizeUser);

    return res.status(200).json({
      code: 200,
      message: "Successfully listed",
      data: usersWithoutPasswords,
      pagination: {
        total: totalUsers,
        page,
        limit,
        totalPages: Math.ceil(totalUsers / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await resetValidation.validateAsync(req.body);

    const { email, OTP, newPassword } = req.body;

    const user = await userModel.findOne({ email: tEmail(email) });

    if (!user || !isOTPValid(user, OTP)) {
      return res
        .status(400)
        .json({ code: 400, message: "Invalid or expired OTP",
          data: []
         });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.OTP = null;
    user.otpExpires = null;

    await user.save();

    return res.status(200).json({
      code: 200,
      message: "Password reset successfully",
      data: [],
    });
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await changeValidation.validateAsync(req.body);
    const {oldPassword, newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        code: 400,
        message: "New password and confirmation do not match",
        data: [],
      });
    }

    const user = await userModel.findOne({  });

    if (!user) {
      return res
        .status(404)
        .json({ code: 404, message: "User not found", data: [] });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ code: 401, message: "Incorrect old password", data: [] });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;

    await user.save();

    return res.status(200).json({
      code: 200,
      message: "Password changed successfully",
      data: [],
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
    await detailValidation.validateAsync(req.body);
    const { email } = req.body;
    const user = await userModel.findOne({ email: tEmail(email) });

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

    const { name, gender, city, state, country, profilePhotoURL, email } =
      req.body;

    const user = await userModel.findOne({});

    if (!user) {
      return res
        .status(404)
        .json({ code: 404, message: "User not found", data: [] });
    }

    if (name) user.name = name.trim();
    if (gender !== undefined) user.gender = gender;
    if (city) user.city = city.trim();
    if (email) user.email = email;
    if (state) user.state = state;
    if (country) user.country = country;
    if (profilePhotoURL) user.profilePictureURL = profilePhotoURL;

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

export const logoutUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email: tEmail(email) });

    if (user) {
      await userModel.findOneAndUpdate(
        { email },
        {
          $set: {
            token: null,
          },
        },
        {
          new: true,
        }
      );
      return res
        .status(200)
        .json({ code: 200, message: "User Logout Successfully", data: [] });
    } else {
      return res
        .status(400)
        .json({ code: 400, message: "User not found", data: [] });
    }
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
  await deleteValidation.validateAsync(req.body);
    const { email } = req.body;
    const deleted = await userModel.findOneAndDelete({ email: tEmail(email) });

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
