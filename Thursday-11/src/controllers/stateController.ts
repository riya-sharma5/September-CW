import type { Request, Response } from 'express';
import { stateModel } from '../models/stateModels.js';

export const getAllStates = async (req: Request, res: Response) => {
  const states = await stateModel.find();
  res.json(states);
};

export const createState = async (req: Request, res: Response) => {
    const state = new stateModel({ stateName: req.body.stateName, countryId: req.body.countryId });
    const exists = await stateModel.findOne
    ({stateName: req.body.stateName});
    if (exists) return res.status(400).json({error:"state already exists" });

  await state.save();
  res.status(201).json(state);
};

export const updateState = async (req: Request, res: Response) => {
  console.log("into update state :", req.body);
  const state = await stateModel.findByIdAndUpdate(req.body._id, {
    stateName: req.body.stateName,
  }, { new: true });
  console.log("result found :", state);
  res.status(200).json(state);
};

export const deleteState = async (req: Request, res: Response) => {
  try {
    const {stateName} = req.body;
    const deleted = await stateModel.findOneAndDelete({stateName});

    if (!deleted) 
        return res.status(404).json({ error:"state not found"});
    res.json({ message:"State deleted successfully" });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
};
