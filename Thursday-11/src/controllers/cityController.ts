import type { Request, Response } from 'express';
import { cityModel } from '../models/cityModels.js';

export const getAllCities = async (req: Request, res: Response) => {
  const cities = await cityModel.find();
  res.json(cities);
};

export const createCity = async (req: Request, res: Response) => {
  const city = new cityModel({ cityName: req.body.cityName, stateId: req.body.stateId});
  const exists = await cityModel.findOne({cityName: req.body.cityName});
    if (exists) return res.status(400).json({error:"city already exists" });

  await city.save();
  res.status(201).json(city);
};

export const updateCity = async (req: Request, res: Response) => {
  const city = await cityModel.findByIdAndUpdate(req.params.id, {
    cityName: req.body.cityName,
    stateId: req.body.stateId
  }, { new: true });
  res.json(city);
};

export const deleteCity = async (req: Request, res: Response) => {
  try {
    const {cityName} = req.body;
    const deleted = await cityModel.findOneAndDelete({cityName});

    if (!deleted) 
        return res.status(404).json({ error:"city not found"});
    res.json({ message:"city deleted successfully" });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
};
