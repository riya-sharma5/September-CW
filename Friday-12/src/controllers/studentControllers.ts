import type {Request, Response} from 'express';
import Student from '../models/studentModels';
import bcrypt from 'bcrypt';
import studentModel from '../models/studentModels';


  

export const registerStudent = async(req: Request, res: Response)=> {
  try {
    
    const { rollno, name, collegeName, course, city, country, state, password} = req.body;

    if (!rollno || !name || !collegeName || !course || !city || !country || !state || !password) {
      return res.status(400).json({ error:'All fields are required'});
    }

    const exists = await Student.findOne({ rollno });
    if (exists) return res.status(400).json({ error: 'Student already exists' });

   const hashedPassword = await bcrypt.hash(password, 10);

    const newStudent = new studentModel({
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

    return res.status(201).json({ code: 200, message:'Student registered successfully', data: newStudent});
  } catch (err) {
    return res.status(400).json({ error: "Bad Request" });
  }
}


export const loginStudent = async (req: Request, res: Response) => {
  try {
    const {rollno, password} = req.body;

    const student = await studentModel.findOne({rollno});
    if (!student)
         return res.status(404).json({error:"Student not found"});

    const match = await bcrypt.compare(password, student.password);
    if (!match) 
        return res.status(401).json({error:"Invalid credentials"});

    res.status(200).json({code: 200, message: "Login successful", student });
  } catch (error) {
    res.status(500).json({ error: "Server error"});
  }
};


export const listStudents = async (req: Request, res: Response) => {
  try {
  
    const students = await studentModel.find();
    res.status(200).json({code:200, message: "sucessfully listed", students});
  } catch {
    res.status(500).json({error:"Server error"
    });
  }
};


export const studentDetail = async (req: Request, res: Response) => {
  try {
    const{rollno} = req.body;
    const student = await studentModel.findOne({rollno});

    if (!student) 
    return res.status(404).json({error: "Student not found"});
    res.status(200).json({code: 200, message: "details fetched successfully", student});
  } catch {
    res.status(500).json({error:"Server error"});
  }
};


export async function editStudent(req: Request, res: Response) {
  try {
    const body = await req.body;
    const { rollno, name, collegeName, course, city, state, country} = body;

    const student = await Student.findOne({ rollno });
    if (!student) 
        return res.status(400).json( { error: 'Student not found' });

    if (name) student.name = name;
    if (collegeName) student.collegeName = collegeName;
    if (course) student.course = course;
    if(city) student.city = city;
    if(country) student.country = country;
    if(state) student.country = country;

    await student.save();
   return res.status(200).json({ code: 200,  message: 'Student updated successfully', student });
  } catch (err) {
    return res.status(400).json ({ error: "Bad Request" });
  }
}

export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const {rollno} = req.body;
    const deleted = await studentModel.findOneAndDelete({rollno});

    if (!deleted) 
        return res.status(404).json({ error:"Student not found"});
    res.status(200).json({ code: 200, message:"Student deleted successfully", data :"[]" });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
};


