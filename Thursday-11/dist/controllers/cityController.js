"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCity = exports.updateCity = exports.createCity = exports.getAllCities = void 0;
const cityModels_1 = require("../models/cityModels");
const getAllCities = async (req, res) => {
    try {
        const cities = await cityModels_1.cityModel.find();
        res.status(200).json(cities);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch cities" });
    }
};
exports.getAllCities = getAllCities;
const createCity = async (req, res) => {
    try {
        const { cityName, stateId } = req.body;
        if (!cityName || typeof cityName !== "string" || cityName.trim() === "") {
            return res.status(400).json({ message: "Invalid Input" });
        }
        if (!stateId) {
            return res.status(400).json({ message: "Invalid Input" });
        }
        const exists = await cityModels_1.cityModel.findOne({ cityName: cityName.trim() });
        if (exists) {
            return res.status(400).json({ message: "City already exists" });
        }
        const city = new cityModels_1.cityModel({
            cityName: cityName.trim(),
            stateId: stateId.trim(),
        });
        await city.save();
        res.status(201).json(city);
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};
exports.createCity = createCity;
const updateCity = async (req, res) => {
    try {
        const { cityName, stateId } = req.body;
        const { id } = req.params;
        if (!id)
            return res.status(400).json({ message: "City ID is required" });
        const city = await cityModels_1.cityModel.findByIdAndUpdate(id, { cityName: cityName?.trim(), stateId: stateId?.trim() }, { new: true });
        if (!city)
            return res.status(404).json({ message: "City not found" });
        res.status(200).json(city);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to update city" });
    }
};
exports.updateCity = updateCity;
const deleteCity = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id)
            return res.status(400).json({ message: "City ID is required" });
        const deleted = await cityModels_1.cityModel.findByIdAndDelete(id);
        if (!deleted)
            return res.status(404).json({ message: "City not found" });
        res.status(200).json({ message: "City deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to delete city" });
    }
};
exports.deleteCity = deleteCity;
//# sourceMappingURL=cityController.js.map