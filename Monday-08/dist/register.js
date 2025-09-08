import * as http from 'http';
import { IncomingMessage, ServerResponse } from 'http';
let students = [];
function sendJSON(res, status, data) {
    res.writeHead(status, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
}
function parseBody(req, callback) {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
        try {
            const parsed = JSON.parse(body);
            callback(null, parsed);
        }
        catch (err) {
            callback(err, null);
        }
    });
}
const server = http.createServer((req, res) => {
    const { url, method } = req;
    if (url === '/register' && method === 'POST') {
        parseBody(req, (err, body) => {
            if (err)
                return sendJSON(res, 400, { error: 'Invalid JSON' });
            const { rollno, name, collegeName, course } = body;
            if (!rollno || !name || !collegeName || !course) {
                return sendJSON(res, 400, { error: 'Missing fields' });
            }
            const exists = students.find(s => s.rollno === rollno);
            if (exists)
                return sendJSON(res, 400, { error: 'Student already exists' });
            students.push({ rollno, name, collegeName, course });
            sendJSON(res, 201, { message: 'Student registered successfully' });
        });
    }
    else if (url === '/students' && method === 'GET') {
        sendJSON(res, 200, students);
    }
    else if (url === '/edit' && method === 'PUT') {
        parseBody(req, (err, body) => {
            if (err)
                return sendJSON(res, 400, { error: 'Invalid JSON' });
            const { rollno, name, collegeName, course } = body;
            const student = students.find(s => s.rollno === rollno);
            if (!student)
                return sendJSON(res, 404, { error: 'Student not found' });
            if (name)
                student.name = name;
            if (collegeName)
                student.collegeName = collegeName;
            if (course)
                student.course = course;
            sendJSON(res, 200, { message: 'Student updated successfully' });
        });
    }
    else if (url === '/delete' && method === 'DELETE') {
        parseBody(req, (err, body) => {
            if (err)
                return sendJSON(res, 400, { error: 'Invalid JSON' });
            const { rollno } = body;
            const index = students.findIndex(s => s.rollno === rollno);
            if (index === -1)
                return sendJSON(res, 404, { error: 'Student not found' });
            students.splice(index, 1);
            sendJSON(res, 200, { message: 'Student deleted successfully' });
        });
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Route not found');
    }
});
server.listen(3000, () => {
    console.log('Server running');
});
//# sourceMappingURL=register.js.map