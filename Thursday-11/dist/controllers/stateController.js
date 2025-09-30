"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteState = exports.updateState = exports.createState = exports.getAllStates = void 0;
const stateModels_1 = require("../models/stateModels");
const getAllStates = async (req, res) => {
    try {
        const states = await stateModels_1.stateModel.find();
        res.status(200).json(states);
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
            return res.status(400).json({ message: "Input" });
        }
        if (!countryId || typeof countryId !== "string") {
            return res.status(400).json({ message: "Invalid Input" });
        }
        const exists = await stateModels_1.stateModel.findOne({ stateName: stateName.trim() });
        if (exists) {
            return res.status(400).json({ message: "State already exists" });
        }
        const state = new stateModels_1.stateModel({ stateName: stateName.trim(), countryId: countryId.trim() });
        await state.save();
        res.status(201).json(state);
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};
exports.createState = createState;
const updateState = async (req, res) => {
    try {
        const { _id, stateName } = req.body;
        if (!_id)
            return res.status(400).json({ message: "_id is required" });
        if (!stateName || typeof stateName !== "string" || stateName.trim() === "") {
            return res.status(400).json({ message: "Invalid Input" });
        }
        const state = await stateModels_1.stateModel.findByIdAndUpdate(_id, { stateName: stateName.trim() }, { new: true });
        if (!state)
            return res.status(404).json({ message: "State not found" });
        res.status(200).json(state);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to update state" });
    }
};
exports.updateState = updateState;
const deleteState = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id)
            return res.status(400).json({ message: "State ID is required" });
        const deleted = await stateModels_1.stateModel.findByIdAndDelete(id);
        if (!deleted)
            return res.status(404).json({ message: "State not found" });
        res.status(200).json({ message: "State deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to delete state" });
    }
};
exports.deleteState = deleteState;
//# sourceMappingURL=stateController.js.map