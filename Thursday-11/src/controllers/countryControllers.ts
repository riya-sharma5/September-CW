import type { Request, Response } from "express";
import { countryModel } from "../models/countryModels.js";

export const getAllCountries = async (req: Request, res: Response) => {
  const countries = await countryModel.find();
  res.json(countries);
};

export const createCountry = async (req: Request, res: Response) => {
  const country = new countryModel({ countryName: req.body.countryName });
  const exists = await countryModel.findOne({
    countryName: req.body.countryName,
  });
  if (exists) return res.status(400).json({ error: "country already exists" });

  await country.save();
  res.status(201).json(country);
};

export const updateCountry = async (req: Request, res: Response) => {
   const {countryName} = req.body;
  const country = await countryModel.findByIdAndUpdate(req.body._id, {
    countryName: req.body.countryName,

  }, { new: true });
  res.json(country);
};

export const deleteCountry = async (req: Request, res: Response) => {
  try {
    const { countryName } = req.body;
    const deleted = await countryModel.findOneAndDelete({ countryName });

    if (!deleted) return res.status(404).json({ error: "country not found" });
    res.json({ message: "country deleted successfully" });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
};
