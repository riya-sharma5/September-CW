import type { Request, Response } from "express";
import cityModel  from "../models/cityModels";

export const getAllCities = async (req: Request, res: Response) => {
  try {
    const cities = await cityModel.find();
    res.status(200).json({code: 200, message: "got all cities", data: cities});
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch cities" });
  }
};

export const createCity = async (req: Request, res: Response) => {
  try {
    const { cityName, stateId } = req.body;

    if (!cityName || typeof cityName !== "string" || cityName.trim() === "") {
      return res.status(400).json({ message: "Invalid Input" });
    }
    if (!stateId) {
      return res.status(400).json({ message: "Invalid Input" });
    }

    const exists = await cityModel.findOne({ cityName: cityName.trim() });
    if (exists) {
      return res.status(400).json({ message: "City already exists" });
    }

    const city = new cityModel({
      cityName: cityName.trim(),
      stateId: stateId.trim(),
    });

    await city.save();
    res.status(201).json({code: 201, message: "successfully created the city", data: city});
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateCity = async (req: Request, res: Response) => {
  try {
    const { _id, cityName } = req.body;

    if (!_id) return res.status(400).json({ message: "_id is required" });
    if (!cityName || typeof cityName !== "string" || cityName.trim() === "") {
      return res.status(400).json({ message: "Invalid Input" });
    }

    const city = await cityModel.findByIdAndUpdate(
      _id,
      { cityName: cityName.trim() },
      { new: true }
    );

    if (!city) return res.status(404).json({ message: "City not found" });

    res.status(200).json({code: 200, message: "successfully updated the city", data: city});
  } catch (error) {
    res.status(500).json({ message: "Failed to update city" });
  }
};


export const deleteCity = async (req: Request, res: Response) => {
  try {
    const { cityName } = req.body;

    if (!cityName) return res.status(400).json({ message: "City name is required" });

    const deleted = await cityModel.findOneAndDelete(cityName);

    if (!deleted) return res.status(404).json({ message: "City not found" });

    res.status(200).json({ code: 200, message: "City deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete city" });
  }
};
