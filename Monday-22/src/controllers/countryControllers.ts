import type { Request, Response, NextFunction } from "express";
import countryModel from "../models/countryModels.js";
import {
  createCountryValidation,
  updateCountryValidation,
  deleteCountryValidation,
  listCountryValidation,
} from "../utils/validationCountry.js";

export const getAllCountries = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("into country list api")
    const {page:pageNo , limit:limitNo} = req.query;
    console.log("page no :", pageNo, "limit no :", limitNo);
    console.log("query :::", req.query);
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string)|| 10;
    const skip = (page - 1) * limit;

    const result = await countryModel.aggregate([
      {
        $facet: {
          data: [{ $skip: skip }, { $limit: limit }],
          total: [{ $count: "totalCountries" }],
        },
      },
    ]);

    let data = result?.[0]?.data ?? [];
    let total = result?.[0]?.total?.[0]?.totalCountries ?? 0;

    res.status(200).json({
      code: 200,
      message: "Got all countries",
      data,
      pagination: {
        totalCountries: total,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        pageSize: limit,
     
      },
    });
  } catch (error) {
    next(error);
  }
};

export const createCountry = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await createCountryValidation.validateAsync(req.body);
    const { countryName } = req.body;
    const exists = await countryModel.findOne({
      countryName: countryName.trim(),
    });
    if (exists) {
      return res
        .status(400)
        .json({ code: 400, message: "Country already exists", data: [] });
    }

    const country = new countryModel({ countryName: countryName.trim() });
    await country.save();

    res.status(201).json({
      code: 201,
      message: "successfulluy created the country",
      data: country,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCountry = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await updateCountryValidation.validateAsync(req.body);
    const { _id, countryName } = req.body;
    const country = await countryModel.findByIdAndUpdate(
      _id,
      { countryName: countryName.trim() },
      { new: true }
    );

    if (!country)
      return res
        .status(404)
        .json({ code: 404, message: "Country not found", data: [] });

    res.status(200).json({
      code: 200,
      message: "successfully updated the country",
      data: country,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCountry = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await deleteCountryValidation.validateAsync(req.body);
    const { countryName } = req.body;
    const deleted = await countryModel.findOneAndDelete({
      countryName: countryName,
    });

    if (!deleted)
      return res
        .status(404)
        .json({ code: 404, message: "Country not found", data: [] });

    res
      .status(200)
      .json({ code: 200, message: "Country deleted successfully", data: [] });
  } catch (error) {
    next(error);
  }
};
