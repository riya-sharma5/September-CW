"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCountry = exports.updateCountry = exports.createCountry = exports.getAllCountries = void 0;
const countryModels_1 = __importDefault(require("../models/countryModels"));
const getAllCountries = async (req, res) => {
    try {
        const countries = await countryModels_1.default.find();
        res.status(200).json({ code: 200, message: "got all countries", data: countries });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch countries" });
    }
};
exports.getAllCountries = getAllCountries;
const createCountry = async (req, res) => {
    try {
        const { countryName } = req.body;
        if (!countryName || typeof countryName !== "string" || countryName.trim() === "") {
            return res.status(400).json({ message: "Invalid Input" });
        }
        const exists = await countryModels_1.default.findOne({ countryName: countryName.trim() });
        if (exists) {
            return res.status(400).json({ message: "Country already exists" });
        }
        const country = new countryModels_1.default({ countryName: countryName.trim() });
        await country.save();
        res.status(201).json({ code: 201, message: "successfulluy created the country", data: country });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};
exports.createCountry = createCountry;
const updateCountry = async (req, res) => {
    try {
        const { _id, countryName } = req.body;
        if (!_id)
            return res.status(400).json({ message: "_id is required" });
        if (!countryName || typeof countryName !== "string" || countryName.trim() === "") {
            return res.status(400).json({ message: "Invalid Input" });
        }
        const country = await countryModels_1.default.findByIdAndUpdate(_id, { countryName: countryName.trim() }, { new: true });
        if (!country)
            return res.status(404).json({ message: "Country not found" });
        res.status(200).json({ code: 200, message: "successfully updated the country", data: country });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to update country" });
    }
};
exports.updateCountry = updateCountry;
const deleteCountry = async (req, res) => {
    try {
        const { _id } = req.body;
        if (!_id)
            return res.status(400).json({ message: "_id is required" });
        const deleted = await countryModels_1.default.findByIdAndDelete(_id);
        if (!deleted)
            return res.status(404).json({ message: "Country not found" });
        res.status(200).json({ code: 200, message: "Country deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to delete country" });
    }
};
exports.deleteCountry = deleteCountry;
//# sourceMappingURL=countryControllers.js.map