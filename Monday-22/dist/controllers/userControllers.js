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
exports.deleteUser = exports.logoutUser = exports.editUser = exports.userDetail = exports.changePassword = exports.resetPassword = exports.getAllUsers = exports.loginUser = exports.verifyOTP = exports.generateOtp = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
const moment_1 = __importDefault(require("moment"));
const userModels_1 = __importDefault(require("../models/userModels"));
const OTP_1 = require("../utils/OTP");
dotenv.config();
if (!process.env.PRIVATE_KEY) {
    throw new Error("Missing PRIVATE_KEY in environment variables.");
}
const genderMap = {
    0: "Male",
    1: "Female",
    2: "Others",
};
const sanitizeUser = (user) => {
    const obj = user.toObject();
    delete obj.password;
    delete obj.OTP;
    delete obj.otpExpires;
    if (typeof obj.gender === "string") {
        obj.gender = genderMap[obj.gender] ?? "Unknown";
    }
    return obj;
};
const tEmail = (email) => email.trim().toLowerCase();
const isOTPValid = (user, inputOTP) => {
    if (user.OTP !== inputOTP) {
        return { valid: false, reason: "invalid" };
    }
    if (new Date(user.otpExpires).getTime() <= Date.now()) {
        return { valid: false, reason: "expired" };
    }
    return { valid: true };
};
const registerUser = async (req, res, next) => {
    try {
        const { email, name, city, gender, country, pincode, state, password, profilePictureURL, } = req.body;
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
        const exists = await userModels_1.default.findOne({ email: temail });
        if (exists) {
            return res
                .status(400)
                .json({ code: 400, message: "User already exists", data: [] });
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const newUser = new userModels_1.default({
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
    }
    catch (error) {
        next(error);
    }
};
exports.registerUser = registerUser;
const generateOtp = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await userModels_1.default.findOne({ email: tEmail(email) });
        if (!user) {
            return res
                .status(404)
                .json({ code: 404, message: "User not found", data: [] });
        }
        const OTP = (0, OTP_1.generateOTP)();
        const expiry = (0, moment_1.default)().add(2, "minutes").toDate();
        user.OTP = OTP;
        user.otpExpires = expiry;
        await user.save();
        await (0, OTP_1.sendOTP)(email, OTP);
        return res.status(200).json({
            code: 200,
            message: "OTP sent successfully",
            data: [],
        });
    }
    catch (error) {
        next(error);
    }
};
exports.generateOtp = generateOtp;
const verifyOTP = async (req, res, next) => {
    try {
        const { email, OTP } = req.body;
        const user = await userModels_1.default.findOne({ email: tEmail(email) });
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
    }
    catch (error) {
        next(error);
    }
};
exports.verifyOTP = verifyOTP;
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await userModels_1.default.findOne({ email: tEmail(email) });
        if (!user) {
            return res.status(404).json({ code: 404, message: "User not found" });
        }
        const match = await bcrypt_1.default.compare(password, user.password);
        if (!match) {
            return res
                .status(401)
                .json({ code: 401, message: "Incorrect password", data: [] });
        }
        await user.save();
        const token = jsonwebtoken_1.default.sign({ _id: user._id, email: user.email }, process.env.PRIVATE_KEY, {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY ?? "1d",
        });
        return res.status(200).json({
            code: 200,
            message: "Login successful",
            data: sanitizeUser(user),
            token,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.loginUser = loginUser;
const getAllUsers = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const result = await userModels_1.default.aggregate([
            {
                $facet: {
                    data: [{ $skip: skip }, { $limit: limit }],
                    total: [{ $count: "totalUsers" }],
                },
            },
        ]);
        const data = result[0].data;
        const total = result[0].total[0]?.totalUsers || 0;
        const totalPages = Math.ceil(total / limit);
        res.status(200).json({
            code: 200,
            message: "Got all users",
            data,
            pagination: {
                totalUsers: total,
                totalPages,
                currentPage: page,
                pageSize: limit,
            },
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getAllUsers = getAllUsers;
const resetPassword = async (req, res, next) => {
    try {
        const { email, OTP, newPassword } = req.body;
        const user = await userModels_1.default.findOne({ email: tEmail(email) });
        console.log("otp in body :", OTP);
        if (!user || !isOTPValid(user, OTP)) {
            return res
                .status(400)
                .json({ code: 400, message: "Invalid or expired OTP", data: [] });
        }
        const hashedPassword = await bcrypt_1.default.hash(newPassword, 10);
        user.password = hashedPassword;
        user.OTP = null;
        user.otpExpires = null;
        await user.save();
        return res.status(200).json({
            code: 200,
            message: "Password reset successfully",
            data: [],
        });
    }
    catch (error) {
        next(error);
    }
};
exports.resetPassword = resetPassword;
const changePassword = async (req, res, next) => {
    try {
        const { oldPassword, newPassword, confirmPassword } = req.body;
        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                code: 400,
                message: "New password and confirmation do not match",
                data: [],
            });
        }
        const userId = res.locals.user?._id;
        const user = await userModels_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({
                code: 404,
                message: "User not found",
                data: [],
            });
        }
        const isMatch = await bcrypt_1.default.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({
                code: 401,
                message: "Incorrect old password",
                data: [],
            });
        }
        const hashedNewPassword = await bcrypt_1.default.hash(newPassword, 10);
        user.password = hashedNewPassword;
        await user.save();
        return res.status(200).json({
            code: 200,
            message: "Password changed successfully",
            data: [],
        });
    }
    catch (error) {
        next(error);
    }
};
exports.changePassword = changePassword;
const userDetail = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await userModels_1.default.findOne({ email: tEmail(email) });
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
    }
    catch (error) {
        next(error);
    }
};
exports.userDetail = userDetail;
const editUser = async (req, res, next) => {
    try {
        const { name, gender, city, state, country, profilePhotoURL, email } = req.body;
        const user = await userModels_1.default.findOne({});
        if (!user) {
            return res
                .status(404)
                .json({ code: 404, message: "User not found", data: [] });
        }
        if (name)
            user.name = name.trim();
        if (gender !== undefined)
            user.gender = gender;
        if (city)
            user.city = city.trim();
        if (email)
            user.email = email;
        if (state)
            user.state = state;
        if (country)
            user.country = country;
        if (profilePhotoURL)
            user.profilePictureURL = profilePhotoURL;
        await user.save();
        return res.status(200).json({
            code: 200,
            message: "User updated successfully",
            data: sanitizeUser(user),
        });
    }
    catch (error) {
        next(error);
    }
};
exports.editUser = editUser;
const logoutUser = async (req, res, next) => {
    try {
        const userId = res.locals.user?._id;
        if (!userId) {
            return res.status(401).json({
                code: 401,
                message: "Unauthorized User ID",
                data: [],
            });
        }
        const user = await userModels_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({
                code: 404,
                message: "User not found",
                data: [],
            });
        }
        await userModels_1.default.findByIdAndUpdate(userId, { $set: { token: null } }, { new: true });
        return res.status(200).json({
            code: 200,
            message: "User logged out successfully",
            data: [],
        });
    }
    catch (error) {
        next(error);
    }
};
exports.logoutUser = logoutUser;
const deleteUser = async (req, res, next) => {
    try {
        const { email } = req.body;
        const deleted = await userModels_1.default.findOneAndDelete({ email: tEmail(email) });
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
    }
    catch (error) {
        next(error);
    }
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=userControllers.js.map