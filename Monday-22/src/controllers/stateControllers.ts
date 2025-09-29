import type { Request, Response, NextFunction } from "express";
import stateModel from "../models/stateModels.js";

export const getAllStates = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const result = await stateModel.aggregate([
      {
        $facet: {
          data: [{ $skip: skip }, { $limit: limit }],
          total: [{ $count: "totalStates" }],
        },
      },
    ]);

    const data = result[0].data;
    const total = result[0].total[0]?.totalStates || 0;
    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      code: 200,
      message: "Got all states",
      data,
      pagination: {
        totalStates: total,
        totalPages,
        currentPage: page,
        pageSize: limit,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const createState = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { stateName, countryId } = req.body;

    const exists = await stateModel.findOne({ stateName: stateName.trim() });

    if (exists) {
      return res
        .status(400)
        .json({ code: 400, message: "State already exists", data: [] });
    }

    const state = new stateModel({
      stateName: stateName.trim(),
      countryId: countryId.trim(),
    });
    await state.save();

    res
      .status(201)
      .json({ code: 201, message: "successfully created state", data: state });
  } catch (error) {
    next(error);
  }
};

export const stateList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { countryId } = req.body;
    const states = await stateModel
      .find({ countryId })
      .populate("countryId", "countryName")
      .exec();

    if (states.length === 0) {
      return res.status(404).json({
        code: 404,
        message: "No states found for this country",
        data: [],
      });
    }

    res.status(200).json({
      code: 200,
      message: "States fetched successfully",
      data: states,
    });
  } catch (error) {
    next(error);
  }
};

export const updateState = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id, stateName } = req.body;

    const state = await stateModel.findByIdAndUpdate(
      _id,
      { stateName: stateName.trim() },
      { new: true }
    );

    if (!state)
      return res
        .status(404)
        .json({ code: 404, message: "State not found", data: [] });

    res.status(200).json({
      code: 200,
      message: "successfully updated the state",
      data: state,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteState = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { stateName } = req.body;

    const deleted = await stateModel.findOneAndDelete({ stateName: stateName });

    if (!deleted)
      return res
        .status(404)
        .json({ code: 404, message: "State not found", data: [] });

    res
      .status(200)
      .json({ code: 200, message: "State deleted successfully", data: [] });
  } catch (error) {
    next(error);
  }
};
