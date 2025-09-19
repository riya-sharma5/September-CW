import type { Request, Response } from "express";
import countryModel  from "../models/countryModels.js";

export const getAllCountries = async (req: Request, res: Response) => {
  try {
    const countries = await countryModel.find();
    res.status(200).json({code: 200, message: "got all countries", data: countries});
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch countries" });
  }
};

export const createCountry = async (req: Request, res: Response) => {
  try {
    const { countryName } = req.body;

    if (!countryName || typeof countryName !== "string" || countryName.trim() === "") {
      return res.status(400).json({ message: "Invalid Input" });
    }

    const exists = await countryModel.findOne({ countryName: countryName.trim() });
    if (exists) {
      return res.status(400).json({ message: "Country already exists" });
    }

    const country = new countryModel({ countryName: countryName.trim() });
    await country.save();

    res.status(201).json({code: 201, message: "successfulluy created the country", data: country});
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateCountry = async (req: Request, res: Response) => {
  try {
    const { _id, countryName } = req.body;

    if (!_id) return res.status(400).json({ message: "_id is required" });
    if (!countryName || typeof countryName !== "string" || countryName.trim() === "") {
      return res.status(400).json({ message: "Invalid Input" });
    }

    const country = await countryModel.findByIdAndUpdate(
      _id,
      { countryName: countryName.trim() },
      { new: true }
    );

    if (!country) return res.status(404).json({ message: "Country not found" });

    res.status(200).json({code: 200, message: "successfully updated the country", data: country});
  } catch (error) {
    res.status(500).json({ message: "Failed to update country" });
  }
};

export const deleteCountry = async (req: Request, res: Response) => {
  try {
    const { _id } = req.body;

    if (!_id) return res.status(400).json({ message: "_id is required" });

    const deleted = await countryModel.findByIdAndDelete(_id);

    if (!deleted) return res.status(404).json({ message: "Country not found" });

    res.status(200).json({code: 200,  message: "Country deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete country" });
  }
};
