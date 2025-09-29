import express from 'express';
import { getAllMovies } from '../controllers/queryControllers.js';
const router = express.Router();
router.get('/comments', getAllMovies);
export default router;
//# sourceMappingURL=moviesRoutes.js.map