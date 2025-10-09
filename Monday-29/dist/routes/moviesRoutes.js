"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const queryControllers_1 = require("../controllers/queryControllers");
const Validation_1 = require("../middleware/Validation");
const router = express_1.default.Router();
router.get('/genres', (0, Validation_1.validateQuery)(Validation_1.genresValidation), queryControllers_1.getAllMoviesGroupedByGenres);
router.get('/year', (0, Validation_1.validateQuery)(Validation_1.yearValidation), queryControllers_1.getMoviesByYearGroupedByGenre);
router.get('/language', (0, Validation_1.validateQuery)(Validation_1.languageValidation), queryControllers_1.getMoviesGroupedByLanguage);
exports.default = router;
//# sourceMappingURL=moviesRoutes.js.map