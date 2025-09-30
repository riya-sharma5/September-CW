"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteState = exports.updateState = exports.stateList = exports.createState = exports.getAllStates = void 0;
const stateModels_1 = __importDefault(require("../models/stateModels"));
const getAllStates = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const result = await stateModels_1.default.aggregate([
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
    }
    catch (error) {
        next(error);
    }
};
exports.getAllStates = getAllStates;
const createState = async (req, res, next) => {
    try {
        const { stateName, countryId } = req.body;
        const exists = await stateModels_1.default.findOne({ stateName: stateName.trim() });
        if (exists) {
            return res
                .status(400)
                .json({ code: 400, message: "State already exists", data: [] });
        }
        const state = new stateModels_1.default({
            stateName: stateName.trim(),
            countryId: countryId.trim(),
        });
        await state.save();
        res
            .status(201)
            .json({ code: 201, message: "successfully created state", data: state });
    }
    catch (error) {
        next(error);
    }
};
exports.createState = createState;
const stateList = async (req, res, next) => {
    try {
        const { countryId } = req.body;
        const states = await stateModels_1.default
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
    }
    catch (error) {
        next(error);
    }
};
exports.stateList = stateList;
const updateState = async (req, res, next) => {
    try {
        const { _id, stateName } = req.body;
        const state = await stateModels_1.default.findByIdAndUpdate(_id, { stateName: stateName.trim() }, { new: true });
        if (!state)
            return res
                .status(404)
                .json({ code: 404, message: "State not found", data: [] });
        res.status(200).json({
            code: 200,
            message: "successfully updated the state",
            data: state,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateState = updateState;
const deleteState = async (req, res, next) => {
    try {
        const { stateName } = req.body;
        const deleted = await stateModels_1.default.findOneAndDelete({ stateName: stateName });
        if (!deleted)
            return res
                .status(404)
                .json({ code: 404, message: "State not found", data: [] });
        res
            .status(200)
            .json({ code: 200, message: "State deleted successfully", data: [] });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteState = deleteState;
//# sourceMappingURL=stateControllers.js.map