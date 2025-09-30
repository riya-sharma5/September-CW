import type { Request, Response, NextFunction } from "express";
import movieModel from "../models/sample_mflix";
import * as dotenv from "dotenv";

dotenv.config();

export const getAllMoviesGroupedByGenres = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.max(1, parseInt(req.query.limit as string) || 10);
    const minRating = parseFloat(req.query.minRating as string) || 0;
    const skip = (page - 1) * limit;

    const result = await movieModel.aggregate([
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
  } catch (error) {
    console.error("Aggregation error:", error);
    next(error);
  }
};

export const getMoviesGroupedByLanguage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.max(1, parseInt(req.query.limit as string) || 10);
    const minRating = parseFloat(req.query.minRating as string) || 0;
    const skip = (page - 1) * limit;

    const result = await movieModel.aggregate([
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
      message: "Grouped movies by language with IMDb rating filter",
      data: languageData,
      pagination: {
        totalLanguages,
        totalPages,
        currentPage: page,
        pageSize: limit,
      },
    });
  } catch (error) {
    console.error("Language aggregation error:", error);
    next(error);
  }
};

export const getMoviesByYearGroupedByGenre = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.max(1, parseInt(req.query.limit as string) || 10);
    const skip = (page - 1) * limit;
    const releaseYear = parseInt(req.query.year as string);

    if (isNaN(releaseYear)) {
      return res.status(400).json({
        code: 400,
        message: "Invalid or missing 'year' query parameter.",
      });
    }

    const result = await movieModel.aggregate([
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
      message: `Grouped movies by genre for release year ${releaseYear}`,
      data: genreData,
      pagination: {
        totalGenres,
        totalPages,
        currentPage: page,
        pageSize: limit,
      },
    });
  } catch (error) {
    console.error("Year aggregation error:", error);
    next(error);
  }
};
