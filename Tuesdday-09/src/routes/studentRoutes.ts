import { IncomingMessage, ServerResponse } from 'http';
import {
  registerStudent,
  getAllStudents,
  editStudent,
  deleteStudent,
} from '../controllers/studentController.ts';

export async function routeRequest(req: IncomingMessage, res: ServerResponse) {
  const { url, method } = req;

  const routeKey = `${method} ${url}`;

  switch (routeKey) {
    case 'POST /register':
      await registerStudent(req, res);
      break;

    case 'GET /students':
      await getAllStudents(req, res);
      break;

    case 'PUT /edit':
      await editStudent(req, res);
      break;

    case 'DELETE /delete':
      await deleteStudent(req, res);
      break;

    default:
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Route not found');
      break;
  }
}
