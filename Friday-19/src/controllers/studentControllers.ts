import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import studentModel from "../models/studentModels.js";

dotenv.config();

export const registerStudent = async (req: Request, res: Response) => {
  try {
    console.log("body :", req.body);
    const {
      rollno,
      name,
      collegeName,
      course,
      city,
      country,
      state,
      password,
    } = req.body;

    if (
      !rollno ||
      !name ||
      !collegeName ||
      !course ||
      !city ||
      !country ||
      !state ||
      !password
    ) {
      return res
        .status(400)
        .json({ code: 400, error: "All fields are required", data: [] });
    }

    const exists = await studentModel.findOne({ rollno });
    if (exists)
      return res
        .status(400)
        .json({ code: 400, error: "Student already exists", data: [] });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newStudent = new studentModel({
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
      message: "Student registered successfully",
      data: newStudent,
    });
  } catch (err) {
    console.error("error registering student", err);
    return res
      .status(500)
      .json({ code: 500, error: "Internal Server Error", data: [] });
  }
};

export const loginStudent = async (req: Request, res: Response) => {
  try {
    console.log("request in login api");
    const { rollNo = "", password = "" } = req.body || {};
    if (!rollNo || !password) {
      return res.status(400).json({
        error: "All field are required",
        data: [],
      });
    }

    const student = await studentModel.findOne({ rollNo });
    if (!student)
      return res.status(404).json({ code: 404, error: "Student not found" });
    console.log("student found ", student._id);
    const match = await bcrypt.compare(password, student.password);
    if (!match)
      return res
        .status(401)
        .json({ code: 401, error: "Invalid credentials", data: [] });

    const token = jwt.sign(
      { _id: "student_id" },
      process.env.PRIVATE_KEY as string,
      {
        expiresIn: (process.env.ACCESS_TOKEN_EXPIRY as "1d") || "1d",
      }
    );

    res.status(200).json({
      code: 200,
      message: "Login successful",
      data: student,
      token: token,
    });
  } catch (error) {
    res
      .status(500)
      .json({ code: 500, error: " Internal Server error", data: [] });
  }
};

export const listStudents = async (req: Request, res: Response) => {
  try {
    const students = await studentModel
      .find()
      .populate("country", "name")
      .populate("state", "name")
      .populate("city", "name")
      .exec();

    res.status(200).json({
      code: 200,
      message: "Successfully listed",
      data: students,
    });
  } catch {
    res.status(500).json({ code: 500, error: "Server error", data: [] });
  }
};

export const studentDetail = async (req: Request, res: Response) => {
  try {
    const { rollNo } = req.body;
    const student = await studentModel.findOne({ rollNo });

    if (!student)
      return res
        .status(404)
        .json({ code: 404, error: "Student not found", data: [] });

    res.status(200).json({
      code: 200,
      message: "Details fetched successfully",
      data: student,
    });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
};

export const editStudent = async (req: Request, res: Response) => {
  try {
    const { rollNo, name, collegeName, course, city, state, country } =
      req.body;

      if(name || collegeName || course || city || state || country){
        res.status(200).json({code: 200, message: "updating", data: []})
      }
    const student = await studentModel.findOne({ rollNo });
    if (!student)
      return res
        .status(400)
        .json({ code: 400, error: "Student not found", data: [] });

    if (name) student.name = name;
    if (collegeName) student.collegeName = collegeName;
    if (course) student.course = course;
    if (city) student.city = city;
    if (country) student.country = country;
    if (state) student.state = state;

    await student.save();

    return res.status(200).json({
      code: 200,
      message: "Student updated successfully",
      data: student,
    });
  } catch (err) {
    return res.status(400).json({ code: 400, error: "Bad Request", data: [] });
  }
};

export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { rollno } = req.body;
    const deleted = await studentModel.findOneAndDelete({ rollno });

    if (!deleted)
      return res
        .status(404)
        .json({ code: 404, error: "Student not found", data: [] });

    res.status(200).json({
      code: 200,
      message: "Student deleted successfully",
      data: [],
    });
  } catch {
    res.status(500).json({ code: 500, error: "Server error", data: [] });
  }
};
