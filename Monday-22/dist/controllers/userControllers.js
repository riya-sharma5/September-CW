import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import userModel from "../models/userModels.js";
import { generateOTP, sendOTP } from "../utils/otp.js";
dotenv.config();
if (!process.env.PRIVATE_KEY) {
    throw new Error("Missing PRIVATE_KEY in environment variables.");
}
const excludePassword = (user) => {
    const obj = user.toObject();
    delete obj.password;
    return obj;
};
export const registerUser = async (req, res, next) => {
    try {
        const { email, name, city, gender, country, state, password } = req.body;
        if (!email ||
            !name ||
            !gender ||
            !city ||
            !country ||
            !state ||
            !password) {
            return res.status(400).json({
                code: 400,
                message: "All fields are required",
                data: [],
            });
        }
        const temail = email.trim();
        const exists = await userModel.findOne({ email: temail });
        if (exists) {
            return res.status(400).json({
                code: 400,
                message: "User already exists",
                data: [],
            });
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
            data: excludePassword(newUser),
        });
    }
    catch (error) {
        next(error);
    }
};
export const generateOtp = async (req, res, next) => {
    const email = req.body.email;
    try {
        let user = await userModel.findOne({ email });
        if (!user) {
            user = new userModel({ email });
        }
        const OTP = generateOTP();
        user.OTP = OTP;
        await user.save();
        sendOTP(email, OTP);
        return res.status(200).json({
            code: 200,
            message: "OTP sent successfully",
            data: []
        });
    }
    catch (error) {
        next(error);
    }
};
export const verifyOTP = async (req, res, next) => {
    const { email, OTP } = req.body;
    try {
        const otpRecord = await OTP.findOne({ email, OTP }).exec();
        if (otpRecord) {
            res.status(200).send('OTP verified successfully');
        }
        else {
            res.status(400).send('Invalid OTP');
        }
    }
    catch (error) {
        next(error);
    }
};
export const loginUser = async (req, res, next) => {
    const email = req.body.email;
    const OTP = req.body.OTP;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                code: 404,
                message: "User not found",
            });
        }
        const token = jwt.sign({ _id: user._id }, process.env.PRIVATE_KEY, {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "1d",
        });
        await user.save();
        return res.status(200).json({
            code: 200,
            message: "Login successful",
            data: excludePassword(user),
            token,
        });
    }
    catch (error) {
        next(error);
    }
};
export const listUsers = async (req, res, next) => {
    try {
        const users = await userModel
            .find()
            .populate("country", "countryName")
            .populate("state", "stateName")
            .populate("city", "cityName")
            .exec();
        const usersWithoutPasswords = users.map(excludePassword);
        return res.status(200).json({
            code: 200,
            message: "Successfully listed",
            data: usersWithoutPasswords,
        });
    }
    catch (error) {
        next(error);
    }
};
export const userDetail = async (req, res, next) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({
                code: 400,
                message: "Email is required",
                data: [],
            });
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                code: 404,
                message: "User not found",
                data: [],
            });
        }
        return res.status(200).json({
            code: 200,
            message: "Details fetched successfully",
            data: excludePassword(user),
        });
    }
    catch (error) {
        next(error);
    }
};
export const editUser = async (req, res, next) => {
    try {
        const { email, name, gender, city, state, country } = req.body;
        if (!email) {
            return res.status(400).json({
                code: 400,
                message: "Email is required",
                data: [],
            });
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                code: 404,
                message: "User not found",
                data: [],
            });
        }
        if (name)
            user.name = name;
        if (gender)
            user.gender = gender;
        if (city)
            user.city = city;
        if (country)
            user.country = country;
        if (state)
            user.state = state;
        await user.save();
        return res.status(200).json({
            code: 200,
            message: "User updated successfully",
            data: excludePassword(user),
        });
    }
    catch (error) {
        next(error);
    }
};
export const deleteUser = async (req, res, next) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({
                code: 400,
                message: "Email is required",
                data: [],
            });
        }
        const deleted = await userModel.findOneAndDelete({ email });
        if (!deleted) {
            return res.status(404).json({
                code: 404,
                message: "User not found",
                data: [],
            });
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
//# sourceMappingURL=userControllers.js.map