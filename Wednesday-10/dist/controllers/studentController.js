import bcrypt from 'bcrypt';
import { StudentModel } from "../models/studentModels.js";
export const registerStudent = async (req, res) => {
    try {
        const { rollno, name, collegeName, course, password } = req.body;
        if (!rollno || !name || !collegeName || !course || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const exists = await StudentModel.findOne({ rollno });
        if (exists)
            return res.status(400).json({ error: "Student already exists" });
        const hashedPassword = await bcrypt.hash(password, 10);
        const newStudent = new StudentModel({
            rollno,
            name,
            collegeName,
            course,
            password: hashedPassword
        });
        await newStudent.save();
        res.status(201).json({ message: "Student registered successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};
export const loginStudent = async (req, res) => {
    try {
        const { rollno, password } = req.body;
        const student = await StudentModel.findOne({ rollno });
        if (!student)
            return res.status(404).json({ error: "Student not found" });
        const match = await bcrypt.compare(password, student.password);
        if (!match)
            return res.status(401).json({ error: "Invalid credentials" });
        res.json({ message: "Login successful", student });
    }
    catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};
export const listStudents = async (req, res) => {
    try {
        const students = await StudentModel.find();
        res.json(students);
    }
    catch {
        res.status(500).json({ error: "Server error" });
    }
};
export const studentDetail = async (req, res) => {
    try {
        const { rollno } = req.body;
        const student = await StudentModel.findOne({ rollno });
        if (!student)
            return res.status(404).json({ error: "Student not found" });
        res.json(student);
    }
    catch {
        res.status(500).json({ error: "Server error" });
    }
};
export const deleteStudent = async (req, res) => {
    try {
        const { rollno } = req.body;
        const deleted = await StudentModel.findOneAndDelete({ rollno });
        if (!deleted)
            return res.status(404).json({ error: "Student not found" });
        res.json({ message: "Student deleted successfully" });
    }
    catch {
        res.status(500).json({ error: "Server error" });
    }
};
//# sourceMappingURL=studentController.js.map