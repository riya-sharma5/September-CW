import type { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import studentModel from '../models/studentmodels.ts';

dotenv.config();

export const registerStudent = async (req: Request, res: Response) => {
  try {
    
    console.log("body :", req.body);
    const { rollno, name, collegeName, course, city, country, state, password } = req.body;

    if (!rollno || !name || !collegeName || !course || !city || !country || !state || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const exists = await studentModel.findOne({ rollno });
    if (exists) return res.status(400).json({ error: 'Student already exists' });

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
      message: 'Student registered successfully',
      data: newStudent,
    });

  } catch (err) {
    console.error("error registering student", err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const loginStudent = async (req: Request, res: Response) => {
  try {
    console.log("request in login api")
    const { rollNo = "", password = "" } = req.body || {};
    if(!rollNo || !password) {
      return res.status(400).json({
        error:"All field are required"
      })
    }

    const student = await studentModel.findOne({ rollNo });
    if (!student)
      return res.status(404).json({ error: 'Student not found' });
    console.log("student found ", student._id);
    const match = await bcrypt.compare(password, student.password);
    if (!match)
      return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign(
      { _id: "student_id" },
      process.env.PRIVATE_KEY as string,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY as '1d' || '1d',
      }
    );
   
 


  
  // const tokenToSave = jwt.sign({name:"Krishna"},"secret");

    res.status(200).json({
      code: 200,
      message: 'Login successful',
      student,
      token
    });
  } catch (error) {
    res.status(500).json({ error: ' Internal Server error' });
  }
};

export const listStudents = async (req: Request, res: Response) => {
  try {
    const students = await studentModel
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
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
};

export const studentDetail = async (req: Request, res: Response) => {
  try {
    const { rollNo } = req.body;
    const student = await studentModel.findOne({ rollNo });

    if (!student)
      return res.status(404).json({ error: 'Student not found' });

    res.status(200).json({
      code: 200,
      message: 'Details fetched successfully',
      student,
    });
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
};

export const editStudent = async (req: Request, res: Response) => {
  try {
    const { rollNo, name, collegeName, course, city, state, country } = req.body;

    const student = await studentModel.findOne({ rollNo });
    if (!student)
      return res.status(400).json({ error: 'Student not found' });

    if (name) student.name = name;
    if (collegeName) student.collegeName = collegeName;
    if (course) student.course = course;
    if (city) student.city = city;
    if (country) student.country = country;
    if (state) student.state = state;

    await student.save();

    return res.status(200).json({
      code: 200,
      message: 'Student updated successfully',
      student,
    });
  } catch (err) {
    return res.status(400).json({ error: 'Bad Request' });
  }
};

export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { rollno } = req.body;
    const deleted = await studentModel.findOneAndDelete({ rollno });

    if (!deleted)
      return res.status(404).json({ error: 'Student not found' });

    res.status(200).json({
      code: 200,
      message: 'Student deleted successfully',
      data: [],
    });
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
};
