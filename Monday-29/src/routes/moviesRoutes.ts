import express from 'express';
import { getAllMoviesGroupedByGenres, getMoviesByYearGroupedByGenre, getMoviesGroupedByLanguage } from '../controllers/queryControllers';
import { validateQuery, validateRequest, yearValidation, genresValidation, languageValidation  } from '../middleware/Validation';
const router = express.Router();

router.get('/genres', validateQuery(genresValidation), getAllMoviesGroupedByGenres); 
router.get('/year', validateQuery(yearValidation), getMoviesByYearGroupedByGenre);
router.get('/language', validateQuery(languageValidation), getMoviesGroupedByLanguage);

export default router;
