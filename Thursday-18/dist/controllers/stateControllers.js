"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteState = exports.updateState = exports.createState = exports.getAllStates = void 0;
const stateModels_1 = __importDefault(require("../models/stateModels"));
const getAllStates = async (req, res) => {
    try {
        const states = await stateModels_1.default.find();
        res
            .status(200)
            .json({ code: 200, message: "got all states", data: states });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch states" });
    }
};
exports.getAllStates = getAllStates;
const createState = async (req, res) => {
    try {
        const { stateName, countryId } = req.body;
        if (!stateName || typeof stateName !== "string" || stateName.trim() === "") {
            return res.status(400).json({ message: "state name is required!" });
        }
        if (!countryId || typeof countryId !== "string") {
            return res.status(400).json({ message: "country Id is required !" });
        }
        const exists = await stateModels_1.default.findOne({ stateName: stateName.trim() });
        if (exists) {
            return res.status(400).json({ message: "State already exists" });
        }
        const state = new stateModels_1.default({ stateName: stateName.trim(), countryId: countryId.trim() });
        await state.save();
        res.status(201).json({ code: 201, message: "successfully created state", data: state });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};
exports.createState = createState;
const updateState = async (req, res) => {
    try {
        const { _id, stateName } = req.body;
        if (!_id)
            return res.status(400).json({ message: "_id is required" });
        if (!stateName ||
            typeof stateName !== "string" ||
            stateName.trim() === "") {
            return res.status(400).json({ message: "Invalid Input" });
        }
        const state = await stateModels_1.default.findByIdAndUpdate(_id, { stateName: stateName.trim() }, { new: true });
        if (!state)
            return res.status(404).json({ message: "State not found" });
        res
            .status(200)
            .json({
            code: 200,
            message: "successfully updated the state",
            data: state,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to update state" });
    }
};
exports.updateState = updateState;
const deleteState = async (req, res) => {
    try {
        const { stateName } = req.body;
        if (!stateName)
            return res.status(400).json({ message: "State name is required" });
        const deleted = await stateModels_1.default.findOneAndDelete(stateName);
        if (!deleted)
            return res.status(404).json({ message: "State not found" });
        res.status(200).json({ code: 200, message: "State deleted successfully", data: [] });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to delete state" });
    }
};
exports.deleteState = deleteState;
//# sourceMappingURL=stateControllers.js.map