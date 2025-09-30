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
exports.deleteStudent = exports.editStudent = exports.studentDetail = exports.listStudents = exports.loginStudent = exports.registerStudent = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
const studentModels_1 = __importDefault(require("../models/studentModels"));
dotenv.config();
const excludePassword = (student) => {
    const obj = student.toObject();
    delete obj.password;
    return obj;
};
const registerStudent = async (req, res, next) => {
    try {
        const { rollno, name, collegeName, course, city, country, state, password, } = req.body;
        if (!rollno ||
            !name ||
            !collegeName ||
            !course ||
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
        const rollNo = rollno.trim();
        const exists = await studentModels_1.default.findOne({ rollNo });
        if (exists) {
            return res.status(400).json({
                code: 400,
                message: "Student already exists",
                data: [],
            });
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const newStudent = new studentModels_1.default({
            rollNo,
            name,
            collegeName,
            course,
            city,
            country,
            state,
            password: hashedPassword,
        });
        await newStudent.save();
        return res.status(201).json({
            code: 201,
            message: "Student registered successfully",
            data: excludePassword(newStudent),
        });
    }
    catch (error) {
        next(error);
    }
};
exports.registerStudent = registerStudent;
const loginStudent = async (req, res, next) => {
    try {
        const { rollNo = "", password = "" } = req.body || {};
        if (!rollNo || !password) {
            return res.status(400).json({
                code: 400,
                message: "All fields are required",
                data: [],
            });
        }
        const student = await studentModels_1.default.findOne({ rollNo });
        if (!student) {
            return res.status(404).json({
                code: 404,
                message: "Student not found",
                data: [],
            });
        }
        const match = await bcrypt_1.default.compare(password, student.password);
        if (!match) {
            return res.status(401).json({
                code: 401,
                message: "Invalid credentials",
                data: [],
            });
        }
        const token = jsonwebtoken_1.default.sign({ _id: student._id }, process.env.PRIVATE_KEY, {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "1d",
        });
        return res.status(200).json({
            code: 200,
            message: "Login successful",
            data: excludePassword(student),
            token,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.loginStudent = loginStudent;
const listStudents = async (req, res, next) => {
    try {
        const students = await studentModels_1.default
            .find()
            .populate("country", "name")
            .populate("state", "name")
            .populate("city", "name")
            .exec();
        const studentsWithoutPasswords = students.map(excludePassword);
        return res.status(200).json({
            code: 200,
            message: "Successfully listed",
            data: studentsWithoutPasswords,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.listStudents = listStudents;
const studentDetail = async (req, res, next) => {
    try {
        const { rollNo } = req.body;
        if (!rollNo) {
            return res.status(400).json({
                code: 400,
                message: "rollNo is required",
                data: [],
            });
        }
        const student = await studentModels_1.default.findOne({ rollNo });
        if (!student) {
            return res.status(404).json({
                code: 404,
                message: "Student not found",
                data: [],
            });
        }
        return res.status(200).json({
            code: 200,
            message: "Details fetched successfully",
            data: excludePassword(student),
        });
    }
    catch (error) {
        next(error);
    }
};
exports.studentDetail = studentDetail;
const editStudent = async (req, res, next) => {
    try {
        const { rollNo, name, collegeName, course, city, state, country } = req.body;
        if (!rollNo) {
            return res.status(400).json({
                code: 400,
                message: "rollNo is required",
                data: [],
            });
        }
        const student = await studentModels_1.default.findOne({ rollNo });
        if (!student) {
            return res.status(404).json({
                code: 404,
                message: "Student not found",
                data: [],
            });
        }
        if (name)
            student.name = name;
        if (collegeName)
            student.collegeName = collegeName;
        if (course)
            student.course = course;
        if (city)
            student.city = city;
        if (country)
            student.country = country;
        if (state)
            student.state = state;
        await student.save();
        return res.status(200).json({
            code: 200,
            message: "Student updated successfully",
            data: excludePassword(student),
        });
    }
    catch (error) {
        next(error);
    }
};
exports.editStudent = editStudent;
const deleteStudent = async (req, res, next) => {
    try {
        const { rollNo } = req.body;
        if (!rollNo) {
            return res.status(400).json({
                code: 400,
                message: "rollNo is required",
                data: [],
            });
        }
        const deleted = await studentModels_1.default.findOneAndDelete({ rollNo });
        if (!deleted) {
            return res.status(404).json({
                code: 404,
                message: "Student not found",
                data: [],
            });
        }
        return res.status(200).json({
            code: 200,
            message: "Student deleted successfully",
            data: [],
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteStudent = deleteStudent;
//# sourceMappingURL=studentControllers.js.map