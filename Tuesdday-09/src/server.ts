import * as http from 'http';
import mongoose from 'mongoose';
import { routeRequest } from './routes/studentRoutes.js';

const PORT = 3000;
const MONGO_URI = 'mongodb://localhost:27017/studentsdb';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');

    const server = http.createServer((req, res) => {
      routeRequest(req, res);
    });

    server.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
