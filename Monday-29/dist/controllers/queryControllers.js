"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMoviesByYearGroupedByGenre = exports.getMoviesGroupedByLanguage = exports.getAllMoviesGroupedByGenres = void 0;
const sample_mflix_1 = __importDefault(require("../models/sample_mflix"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const getAllMoviesGroupedByGenres = async (req, res, next) => {
    try {
        const page = Math.max(1, parseInt(req.query.page) || 1);
        const limit = Math.max(1, parseInt(req.query.limit) || 10);
        const minRating = parseFloat(req.query.minRating) || 0;
        const skip = (page - 1) * limit;
        const result = await sample_mflix_1.default.aggregate([
            {
                $match: {
                    "imdb.rating": { $ne: null, $gt: minRating },
                    genres: { $exists: true, $ne: [] },
                },
            },
            {
                $unwind: "$genres",
            },
            {
                $group: {
                    _id: "$genres",
                    movies: {
                        $addToSet: {
                            title: "$title",
                            rating: "$imdb.rating",
                            plot: "$plot",
                        },
                    },
                },
            },
            {
                $facet: {
                    data: [{ $skip: skip }, { $limit: limit }],
                    totalGenres: [{ $count: "total" }],
                },
            },
        ]);
        const genresData = result?.[0]?.data ?? [];
        const totalGenres = result?.[0]?.totalGenres?.[0]?.total ?? 0;
        const totalPages = Math.ceil(totalGenres / limit);
        console.log("data", genresData.length);
        console.log("total genres", totalGenres);
        res.status(200).json({
            code: 200,
            message: "grouped movies by genre with IMDb rating filter",
            data: genresData,
            pagination: {
                totalGenres,
                totalPages,
                currentPage: page,
                pageSize: limit,
            },
        });
    }
    catch (error) {
        console.error("Aggregation error:", error);
        next(error);
    }
};
exports.getAllMoviesGroupedByGenres = getAllMoviesGroupedByGenres;
const getMoviesGroupedByLanguage = async (req, res, next) => {
    try {
        const page = Math.max(1, parseInt(req.query.page) || 1);
        const limit = Math.max(1, parseInt(req.query.limit) || 10);
        const minRating = parseFloat(req.query.minRating) || 0;
        const skip = (page - 1) * limit;
        const result = await sample_mflix_1.default.aggregate([
            {
                $match: {
                    "imdb.rating": { $ne: null, $gt: minRating },
                    languages: { $exists: true, $ne: [] },
                },
            },
            {
                $unwind: "$languages",
            },
            {
                $group: {
                    _id: "$languages",
                    movies: {
                        $addToSet: {
                            title: "$title",
                            rating: "$imdb.rating",
                            plot: "$plot",
                        },
                    },
                },
            },
            {
                $facet: {
                    data: [{ $skip: skip }, { $limit: limit }],
                    totalLanguages: [{ $count: "total" }],
                },
            },
        ]);
        const languageData = result?.[0]?.data ?? [];
        const totalLanguages = result?.[0]?.totalLanguages?.[0]?.total ?? 0;
        const totalPages = Math.ceil(totalLanguages / limit);
        res.status(200).json({
            code: 200,
            message: "grouped movies by language with IMDb rating filter",
            data: languageData,
            pagination: {
                totalLanguages,
                totalPages,
                currentPage: page,
                pageSize: limit,
            },
        });
    }
    catch (error) {
        console.error("Language aggregation error:", error);
        next(error);
    }
};
exports.getMoviesGroupedByLanguage = getMoviesGroupedByLanguage;
const getMoviesByYearGroupedByGenre = async (req, res, next) => {
    try {
        const page = Math.max(1, parseInt(req.query.page) || 1);
        const limit = Math.max(1, parseInt(req.query.limit) || 10);
        const skip = (page - 1) * limit;
        const releaseYear = parseInt(req.query.year);
        if (isNaN(releaseYear)) {
            return res.status(400).json({
                code: 400,
                message: "Invalid or missing 'year' query parameter.",
            });
        }
        const result = await sample_mflix_1.default.aggregate([
            {
                $match: {
                    year: releaseYear,
                    genres: { $exists: true, $ne: [] },
                },
            },
            {
                $unwind: "$genres",
            },
            {
                $group: {
                    _id: "$genres",
                    movies: {
                        $addToSet: {
                            title: "$title",
                            rating: "$imdb.rating",
                            plot: "$plot",
                        },
                    },
                },
            },
            {
                $facet: {
                    data: [{ $skip: skip }, { $limit: limit }],
                    totalGenres: [{ $count: "total" }],
                },
            },
        ]);
        const genreData = result?.[0]?.data ?? [];
        const totalGenres = result?.[0]?.totalGenres?.[0]?.total ?? 0;
        const totalPages = Math.ceil(totalGenres / limit);
        res.status(200).json({
            code: 200,
            message: 'grouped movies by genre for release year',
            data: genreData,
            pagination: {
                totalGenres,
                totalPages,
                currentPage: page,
                pageSize: limit,
            },
        });
    }
    catch (error) {
        console.error("Year aggregation error:", error);
        next(error);
    }
};
exports.getMoviesByYearGroupedByGenre = getMoviesByYearGroupedByGenre;
//# sourceMappingURL=queryControllers.js.map