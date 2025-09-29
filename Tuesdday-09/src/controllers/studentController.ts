import { IncomingMessage, ServerResponse } from 'http';
import Student from '../models/studentModel.ts';

function sendJSON(res: ServerResponse, status: number, data: any): void {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

function parseBody(req: IncomingMessage): Promise<any> {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(new Error('Invalid JSON'));
      }
    });
  });
}

export async function registerStudent(req: IncomingMessage, res: ServerResponse) {
  try {
    const body = await parseBody(req);
    const { rollno, name, collegeName, course } = body;

    if (!rollno || !name || !collegeName || !course) {
      return sendJSON(res, 400, { error:'Missing fields'});
    }

    const exists = await Student.findOne({ rollno });
    if (exists) return sendJSON(res, 400, { error: 'Student already exists' });

    const student = new Student({ rollno, name, collegeName, course });
    await student.save();
    sendJSON(res, 201, { message:'Student registered successfully'});
  } catch (err) {
    sendJSON(res, 400, { error: "Bad Request" });
  }
}

export async function getAllStudents(_req: IncomingMessage, res: ServerResponse) {
  const students = await Student.find();
  sendJSON(res, 200, students);
}

export async function editStudent(req: IncomingMessage, res: ServerResponse) {
  try {
    const body = await parseBody(req);
    const { rollno, name, collegeName, course } = body;

    const student = await Student.findOne({ rollno });
    if (!student) return sendJSON(res, 404, { error: 'Student not found' });

    if (name) student.name = name;
    if (collegeName) student.collegeName = collegeName;
    if (course) student.course = course;

    await student.save();
    sendJSON(res, 200, { message: 'Student updated successfully' });
  } catch (err) {
    sendJSON(res, 400, { error: "Bad Request" });
  }
}

export async function deleteStudent(req: IncomingMessage, res: ServerResponse) {
  try {
    const body = await parseBody(req);
    const { rollno } = body;

    const result = await Student.deleteOne({ rollno });
    if (result.deletedCount === 0)
      return sendJSON(res, 404, { error: 'Student not found' });

    sendJSON(res, 200, { message: 'Student deleted successfully' });
  } catch (err) {
    sendJSON(res, 400, { error: "Bad Request" });
  }
}
