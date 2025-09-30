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
const studentmodels_1 = __importDefault(require("../models/studentmodels"));
dotenv.config();
const registerStudent = async (req, res) => {
    try {
        console.log("body :", req.body);
        const { rollno, name, collegeName, course, city, country, state, password } = req.body;
        if (!rollno || !name || !collegeName || !course || !city || !country || !state || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const exists = await studentmodels_1.default.findOne({ rollno });
        if (exists)
            return res.status(400).json({ error: 'Student already exists' });
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const newStudent = new studentmodels_1.default({
            rollNo: rollno,
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
            message: 'Student registered successfully',
            data: newStudent,
        });
    }
    catch (err) {
        console.error("error registering student", err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.registerStudent = registerStudent;
const loginStudent = async (req, res) => {
    try {
        console.log("request in login api");
        const { rollNo = "", password = "" } = req.body || {};
        if (!rollNo || !password) {
            return res.status(400).json({
                error: "All field are required"
            });
        }
        const student = await studentmodels_1.default.findOne({ rollNo });
        if (!student)
            return res.status(404).json({ error: 'Student not found' });
        console.log("student found ", student._id);
        const match = await bcrypt_1.default.compare(password, student.password);
        if (!match)
            return res.status(401).json({ error: 'Invalid credentials' });
        const token = jsonwebtoken_1.default.sign({ _id: "student_id" }, process.env.PRIVATE_KEY, {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '1d',
        });
        // const tokenToSave = jwt.sign({name:"Krishna"},"secret");
        res.status(200).json({
            code: 200,
            message: 'Login successful',
            student,
            token
        });
    }
    catch (error) {
        res.status(500).json({ error: ' Internal Server error' });
    }
};
exports.loginStudent = loginStudent;
const listStudents = async (req, res) => {
    try {
        const students = await studentmodels_1.default
            .find()
            .populate('country', 'name')
            .populate('state', 'name')
            .populate('city', 'name')
            .exec();
        res.status(200).json({
            code: 200,
            message: 'Successfully listed',
            students,
        });
    }
    catch {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.listStudents = listStudents;
const studentDetail = async (req, res) => {
    try {
        const { rollNo } = req.body;
        const student = await studentmodels_1.default.findOne({ rollNo });
        if (!student)
            return res.status(404).json({ error: 'Student not found' });
        res.status(200).json({
            code: 200,
            message: 'Details fetched successfully',
            student,
        });
    }
    catch {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.studentDetail = studentDetail;
const editStudent = async (req, res) => {
    try {
        const { rollNo, name, collegeName, course, city, state, country } = req.body;
        const student = await studentmodels_1.default.findOne({ rollNo });
        if (!student)
            return res.status(400).json({ error: 'Student not found' });
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
            message: 'Student updated successfully',
            student,
        });
    }
    catch (err) {
        return res.status(400).json({ error: 'Bad Request' });
    }
};
exports.editStudent = editStudent;
const deleteStudent = async (req, res) => {
    try {
        const { rollno } = req.body;
        const deleted = await studentmodels_1.default.findOneAndDelete({ rollno });
        if (!deleted)
            return res.status(404).json({ error: 'Student not found' });
        res.status(200).json({
            code: 200,
            message: 'Student deleted successfully',
            data: [],
        });
    }
    catch {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.deleteStudent = deleteStudent;
//# sourceMappingURL=studentControllers.js.map