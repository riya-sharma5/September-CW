import type { Request, Response, NextFunction } from "express";
import cityModel from "../models/cityModels.js";


export const getAllCities = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cities = await cityModel
      .find()
      .populate("stateId", "stateName")
      .exec();

    res.status(200).json({
      code: 200,
      message: "Successfully fetched all cities",
      data: cities,
    });
  } catch (error) {
    next(error);
  }
};

export const createCity = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { cityName, stateId } = req.body;

    if (!cityName || typeof cityName !== "string" || cityName.trim() === "") {
      return res
        .status(400)
        .json({ code: 400, message: "Invalid cityName input", data: [] });
    }

    if (!stateId || typeof stateId !== "string") {
      return res
        .status(400)
        .json({ code: 400, message: "Invalid stateId input", data: [] });
    }

    const exists = await cityModel.findOne({
      cityName: cityName.trim(),
      stateId: stateId.trim(),
    });

    if (exists) {
      return res
        .status(400)
        .json({
          code: 400,
          message: "City already exists in this state",
          data: [],
        });
    }

    const city = new cityModel({
      cityName: cityName.trim(),
      stateId: stateId.trim(),
    });

    await city.save();

    res.status(201).json({
      code: 201,
      message: "Successfully created the city",
      data: city,
    });
  } catch (error) {
    next(error);
  }
};

export const cityList = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { stateId, countryId } = req.body;

    if (!stateId || !countryId) {
      return res.status(400).json({
        code: 400,
        error: "stateId and countryId are required",
        data: [],
      });
    }

    const cities = await cityModel
      .find({ stateId, countryId })
      .populate("stateId", "stateName")
      .populate("countryId", "countryName")
      .exec();

       if (cities.length === 0) {
      return res.status(404).json({
        code: 404,
        message: "No cities found for this state and country",
        data: [],
      });
    }

    res.status(200).json({
      code: 200,
      message: "Details fetched successfully",
      data: cities,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCity = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { _id, cityName } = req.body;

    if (!_id) {
      return res
        .status(400)
        .json({ code: 400, message: "_id is required", data: [] });
    }

    if (!cityName || typeof cityName !== "string" || cityName.trim() === "") {
      return res
        .status(400)
        .json({ code: 400, message: "Invalid cityName input", data: [] });
    }

    const updatedCity = await cityModel.findByIdAndUpdate(
      _id,
      { cityName: cityName.trim() },
      { new: true }
    );

    if (!updatedCity) {
      return res
        .status(404)
        .json({ code: 404, message: "City not found", data: [] });
    }

    res.status(200).json({
      code: 200,
      message: "Successfully updated the city",
      data: updatedCity,
    });
  } catch (error) {
    next(error);
  }
};


export const deleteCity = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { cityName } = req.body;

    if (!cityName || typeof cityName !== "string") {
      return res
        .status(400)
        .json({ code: 400, message: "City name is required", data: [] });
    }

    const deleted = await cityModel.findOneAndDelete({
      cityName: cityName.trim(),
    });

    if (!deleted) {
      return res
        .status(404)
        .json({ code: 404, message: "City not found", data: [] });
    }

    res.status(200).json({
      code: 200,
      message: "City deleted successfully",
      data: [],
    });
  } catch (error) {
    next(error);
  }
};
