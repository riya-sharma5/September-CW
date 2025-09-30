"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStudent = exports.studentDetail = exports.listStudents = exports.loginStudent = exports.registerStudent = void 0;
exports.editStudent = editStudent;
const studentModels_1 = __importDefault(require("../models/studentModels"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const studentModels_2 = __importDefault(require("../models/studentModels"));
const registerStudent = async (req, res) => {
    try {
        const { rollno, name, collegeName, course, city, country, state, password } = req.body;
        if (!rollno || !name || !collegeName || !course || !city || !country || !state || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const exists = await studentModels_1.default.findOne({ rollno });
        if (exists)
            return res.status(400).json({ error: 'Student already exists' });
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const newStudent = new studentModels_2.default({
            rollno,
            name,
            collegeName,
            course,
            city,
            country,
            state,
            password: hashedPassword
        });
        await newStudent.save();
        return res.status(201).json({ code: 200, message: 'Student registered successfully', data: newStudent });
    }
    catch (err) {
        return res.status(400).json({ error: "Bad Request" });
    }
};
exports.registerStudent = registerStudent;
const loginStudent = async (req, res) => {
    try {
        const { rollno, password } = req.body;
        const student = await studentModels_2.default.findOne({ rollno });
        if (!student)
            return res.status(404).json({ error: "Student not found" });
        const match = await bcrypt_1.default.compare(password, student.password);
        if (!match)
            return res.status(401).json({ error: "Invalid credentials" });
        res.status(200).json({ code: 200, message: "Login successful", student });
    }
    catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};
exports.loginStudent = loginStudent;
const listStudents = async (req, res) => {
    try {
        const students = await studentModels_2.default.find();
        res.status(200).json({ code: 200, message: "sucessfully listed", students });
    }
    catch {
        res.status(500).json({ error: "Server error"
        });
    }
};
exports.listStudents = listStudents;
const studentDetail = async (req, res) => {
    try {
        const { rollno } = req.body;
        const student = await studentModels_2.default.findOne({ rollno });
        if (!student)
            return res.status(404).json({ error: "Student not found" });
        res.status(200).json({ code: 200, message: "details fetched successfully", student });
    }
    catch {
        res.status(500).json({ error: "Server error" });
    }
};
exports.studentDetail = studentDetail;
async function editStudent(req, res) {
    try {
        const body = await req.body;
        const { rollno, name, collegeName, course, city, state, country } = body;
        const student = await studentModels_1.default.findOne({ rollno });
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
            student.country = country;
        await student.save();
        return res.status(200).json({ code: 200, message: 'Student updated successfully', student });
    }
    catch (err) {
        return res.status(400).json({ error: "Bad Request" });
    }
}
const deleteStudent = async (req, res) => {
    try {
        const { rollno } = req.body;
        const deleted = await studentModels_2.default.findOneAndDelete({ rollno });
        if (!deleted)
            return res.status(404).json({ error: "Student not found" });
        res.status(200).json({ code: 200, message: "Student deleted successfully", data: "[]" });
    }
    catch {
        res.status(500).json({ error: "Server error" });
    }
};
exports.deleteStudent = deleteStudent;
//# sourceMappingURL=studentControllers.js.map