import type { Request, Response } from "express";
import { stateModel } from "../models/stateModels";

export const getAllStates = async (req: Request, res: Response) => {
  try {
    const states = await stateModel.find();
    res.status(200).json(states);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch states" });
  }
};

export const createState = async (req: Request, res: Response) => {
  try {
    const { stateName, countryId } = req.body;

  
    if (!stateName || typeof stateName !== "string" || stateName.trim() === "") {
      return res.status(400).json({ message: "Input" });
    }
    if (!countryId || typeof countryId !== "string") {
      return res.status(400).json({ message: "Invalid Input" });
    }

    const exists = await stateModel.findOne({ stateName: stateName.trim() });
    if (exists) {
      return res.status(400).json({ message: "State already exists" });
    }

   
    const state = new stateModel({ stateName: stateName.trim(), countryId: countryId.trim() });
    await state.save();

    res.status(201).json(state);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateState = async (req: Request, res: Response) => {
  try {
    const { _id, stateName } = req.body;

    if (!_id) return res.status(400).json({ message: "_id is required" });
    if (!stateName || typeof stateName !== "string" || stateName.trim() === "") {
      return res.status(400).json({ message: "Invalid Input" });
    }

    const state = await stateModel.findByIdAndUpdate(
      _id,
      { stateName: stateName.trim() },
      { new: true }
    );

    if (!state) return res.status(404).json({ message: "State not found" });

    res.status(200).json(state);
  } catch (error) {
    res.status(500).json({ message: "Failed to update state" });
  }
};

export const deleteState = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: "State ID is required" });

    const deleted = await stateModel.findByIdAndDelete(id);

    if (!deleted) return res.status(404).json({ message: "State not found" });

    res.status(200).json({ message: "State deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete state" });
  }
};
