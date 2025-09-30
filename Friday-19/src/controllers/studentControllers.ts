import type { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import studentModel from "../models/studentModels";

dotenv.config();

const excludePassword = (student: any) => {
  const obj = student.toObject();
  delete obj.password;
  return obj;
};

export const registerStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
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
      return res.status(400).json({
        code: 400,
        message: "All fields are required",
        data: [],
      });
    }

    const rollNo = rollno.trim();

  
    const exists = await studentModel.findOne({ rollNo });
    if (exists) {
      return res.status(400).json({
        code: 400,
        message: "Student already exists",
        data: [],
      });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

  
    const newStudent = new studentModel({
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
  } catch (error) {
    next(error);
  }
};

export const loginStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { rollNo = "", password = "" } = req.body || {};

    if (!rollNo || !password) {
      return res.status(400).json({
        code: 400,
        message: "All fields are required",
        data: [],
      });
    }

    const student = await studentModel.findOne({ rollNo });
    if (!student) {
      return res.status(404).json({
        code: 404,
        message: "Student not found",
        data: [],
      });
    }

    const match = await bcrypt.compare(password, student.password);
    if (!match) {
      return res.status(401).json({
        code: 401,
        message: "Invalid credentials",
        data: [],
      });
    }

    const token = jwt.sign(
      { _id: student._id },
      process.env.PRIVATE_KEY as string,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY as '1d'|| "1d",
      }
    );

    return res.status(200).json({
      code: 200,
      message: "Login successful",
      data: excludePassword(student),
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const listStudents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const students = await studentModel
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
  } catch (error) {
    next(error);
  }
};

export const studentDetail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { rollNo } = req.body;

    if (!rollNo) {
      return res.status(400).json({
        code: 400,
        message: "rollNo is required",
        data: [],
      });
    }

    const student = await studentModel.findOne({ rollNo });

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
  } catch (error) {
    next(error);
  }
};

export const editStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { rollNo, name, collegeName, course, city, state, country } = req.body;

    if (!rollNo) {
      return res.status(400).json({
        code: 400,
        message: "rollNo is required",
        data: [],
      });
    }

    const student = await studentModel.findOne({ rollNo });

    if (!student) {
      return res.status(404).json({
        code: 404,
        message: "Student not found",
        data: [],
      });
    }

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
      data: excludePassword(student),
    });
  } catch (error) {
    next(error);
  }
};

export const deleteStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { rollNo } = req.body;

    if (!rollNo) {
      return res.status(400).json({
        code: 400,
        message: "rollNo is required",
        data: [],
      });
    }

    const deleted = await studentModel.findOneAndDelete({ rollNo });

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
  } catch (error) {
    next(error);
  }
};
