import type { Request, Response, NextFunction } from "express";
import movieModel from "../models/sample_mflix.js"; 
import * as dotenv from "dotenv";

dotenv.config();

export const getAllMovies = async (
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
          data: [
            { $skip: skip },
            { $limit: limit },
          ],
          totalGenres: [
            { $count: "total" },
          ],
        },
      },
    ]);

    const genresData = result?.[0]?.data ?? [];
    const totalGenres = result?.[0]?.totalGenres?.[0]?.total ?? 0;
    const totalPages = Math.ceil(totalGenres / limit);

    console.log(`Genres returned: ${genresData.length} / Total genres: ${totalGenres}`);

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
