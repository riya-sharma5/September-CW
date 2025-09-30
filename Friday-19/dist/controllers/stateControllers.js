"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteState = exports.updateState = exports.stateList = exports.createState = exports.getAllStates = void 0;
const stateModels_1 = __importDefault(require("../models/stateModels"));
const getAllStates = async (req, res, next) => {
    try {
        const states = await stateModels_1.default.find()
            .populate("countryId", "countryName")
            .exec();
        res
            .status(200)
            .json({ code: 200, message: "got all states", data: states });
    }
    catch (error) {
        res;
        next(error);
    }
};
exports.getAllStates = getAllStates;
const createState = async (req, res, next) => {
    try {
        const { stateName, countryId } = req.body;
        if (!stateName ||
            typeof stateName !== "string" ||
            stateName.trim() === "") {
            return res
                .status(400)
                .json({ code: 400, message: "state name is required!", data: [] });
        }
        if (!countryId || typeof countryId !== "string") {
            return res
                .status(400)
                .json({ code: 400, message: "country Id is required !", data: [] });
        }
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
        if (!countryId || typeof countryId !== "string") {
            return res.status(400).json({
                code: 400,
                message: "countryId is required and should be a string",
                data: [],
            });
        }
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
        if (!_id)
            return res
                .status(400)
                .json({ code: 400, message: "_id is required", data: [] });
        if (!stateName ||
            typeof stateName !== "string" ||
            stateName.trim() === "") {
            return res
                .status(400)
                .json({ code: 400, message: "Invalid Input", data: [] });
        }
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
        if (!stateName)
            return res.status(400).json({ code: 400, message: "State name is required", data: [] });
        const deleted = await stateModels_1.default.findOneAndDelete({ stateName: stateName });
        if (!deleted)
            return res.status(404).json({ code: 404, message: "State not found", data: [] });
        res.status(200).json({ code: 200, message: "State deleted successfully", data: [] });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteState = deleteState;
//# sourceMappingURL=stateControllers.js.map