import express from 'express';
import { getAllMoviesGroupedByGenres, getMoviesByYearGroupedByGenre, getMoviesGroupedByLanguage } from '../controllers/queryControllers';

const router = express.Router();

router.get('/genres', getAllMoviesGroupedByGenres); 
router.get('/year', getMoviesByYearGroupedByGenre);
router.get('/language', getMoviesGroupedByLanguage);

export default router;
