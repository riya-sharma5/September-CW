"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const queryControllers_1 = require("../controllers/queryControllers");
const router = express_1.default.Router();
router.get('/genres', queryControllers_1.getAllMoviesGroupedByGenres);
router.get('/year', queryControllers_1.getMoviesByYearGroupedByGenre);
router.get('/language', queryControllers_1.getMoviesGroupedByLanguage);
exports.default = router;
//# sourceMappingURL=moviesRoutes.js.map