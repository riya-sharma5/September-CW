"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCountry = exports.updateCountry = exports.createCountry = exports.getAllCountries = void 0;
const countryModels_1 = __importDefault(require("../models/countryModels"));
const getAllCountries = async (req, res, next) => {
    try {
        const countries = await countryModels_1.default.find();
        res.status(200).json({ code: 200, message: "got all countries", data: countries });
    }
    catch (error) {
        next(error);
    }
};
exports.getAllCountries = getAllCountries;
const createCountry = async (req, res, next) => {
    try {
        const { countryName } = req.body;
        if (!countryName || typeof countryName !== "string" || countryName.trim() === "") {
            return res.status(400).json({ code: 400, message: "Invalid Input", data: [] });
        }
        const exists = await countryModels_1.default.findOne({ countryName: countryName.trim() });
        if (exists) {
            return res.status(400).json({ code: 400, message: "Country already exists", data: [] });
        }
        const country = new countryModels_1.default({ countryName: countryName.trim() });
        await country.save();
        res.status(201).json({ code: 201, message: "successfulluy created the country", data: country });
    }
    catch (error) {
        next(error);
    }
};
exports.createCountry = createCountry;
const updateCountry = async (req, res, next) => {
    try {
        const { _id, countryName } = req.body;
        if (!_id)
            return res.status(400).json({ code: 400, message: "_id is required", data: [] });
        if (!countryName || typeof countryName !== "string" || countryName.trim() === "") {
            return res.status(400).json({ code: 400, message: "Invalid Input", data: [] });
        }
        const country = await countryModels_1.default.findByIdAndUpdate(_id, { countryName: countryName.trim() }, { new: true });
        if (!country)
            return res.status(404).json({ code: 404, message: "Country not found", data: [] });
        res.status(200).json({ code: 200, message: "successfully updated the country", data: country });
    }
    catch (error) {
        next(error);
    }
};
exports.updateCountry = updateCountry;
const deleteCountry = async (req, res, next) => {
    try {
        const { countryName } = req.body;
        if (!countryName)
            return res.status(400).json({ code: 400, message: "countryName is required", data: [] });
        const deleted = await countryModels_1.default.findOneAndDelete({ countryName: countryName });
        if (!deleted)
            return res.status(404).json({ code: 404, message: "Country not found", data: [] });
        res.status(200).json({ code: 200, message: "Country deleted successfully", data: [] });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteCountry = deleteCountry;
//# sourceMappingURL=countryControllers.js.map