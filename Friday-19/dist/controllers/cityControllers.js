"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCity = exports.updateCity = exports.cityList = exports.createCity = exports.getAllCities = void 0;
const cityModels_1 = __importDefault(require("../models/cityModels"));
const getAllCities = async (req, res, next) => {
    try {
        const cities = await cityModels_1.default
            .find()
            .populate("stateId", "stateName")
            .exec();
        res.status(200).json({
            code: 200,
            message: "Successfully fetched all cities",
            data: cities,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getAllCities = getAllCities;
const createCity = async (req, res, next) => {
    try {
        const { cityName, stateId } = req.body;
        if (!cityName || typeof cityName !== "string" || cityName.trim() === "") {
            return res
                .status(400)
                .json({ code: 400, message: "Invalid cityName input", data: [] });
        }
        if (!stateId || typeof stateId !== "string") {
            return res
                .status(400)
                .json({ code: 400, message: "Invalid stateId input", data: [] });
        }
        const exists = await cityModels_1.default.findOne({
            cityName: cityName.trim(),
            stateId: stateId.trim(),
        });
        if (exists) {
            return res
                .status(400)
                .json({
                code: 400,
                message: "City already exists in this state",
                data: [],
            });
        }
        const city = new cityModels_1.default({
            cityName: cityName.trim(),
            stateId: stateId.trim(),
        });
        await city.save();
        res.status(201).json({
            code: 201,
            message: "Successfully created the city",
            data: city,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createCity = createCity;
const cityList = async (req, res, next) => {
    try {
        const { stateId, countryId } = req.body;
        if (!stateId || !countryId) {
            return res.status(400).json({
                code: 400,
                error: "stateId and countryId are required",
                data: [],
            });
        }
        const cities = await cityModels_1.default
            .find({ stateId, countryId })
            .populate("stateId", "stateName")
            .populate("countryId", "countryName")
            .exec();
        if (cities.length === 0) {
            return res.status(404).json({
                code: 404,
                message: "No cities found for this state and country",
                data: [],
            });
        }
        res.status(200).json({
            code: 200,
            message: "Details fetched successfully",
            data: cities,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.cityList = cityList;
const updateCity = async (req, res, next) => {
    try {
        const { _id, cityName } = req.body;
        if (!_id) {
            return res
                .status(400)
                .json({ code: 400, message: "_id is required", data: [] });
        }
        if (!cityName || typeof cityName !== "string" || cityName.trim() === "") {
            return res
                .status(400)
                .json({ code: 400, message: "Invalid cityName input", data: [] });
        }
        const updatedCity = await cityModels_1.default.findByIdAndUpdate(_id, { cityName: cityName.trim() }, { new: true });
        if (!updatedCity) {
            return res
                .status(404)
                .json({ code: 404, message: "City not found", data: [] });
        }
        res.status(200).json({
            code: 200,
            message: "Successfully updated the city",
            data: updatedCity,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateCity = updateCity;
const deleteCity = async (req, res, next) => {
    try {
        const { cityName } = req.body;
        if (!cityName || typeof cityName !== "string") {
            return res
                .status(400)
                .json({ code: 400, message: "City name is required", data: [] });
        }
        const deleted = await cityModels_1.default.findOneAndDelete({
            cityName: cityName.trim(),
        });
        if (!deleted) {
            return res
                .status(404)
                .json({ code: 404, message: "City not found", data: [] });
        }
        res.status(200).json({
            code: 200,
            message: "City deleted successfully",
            data: [],
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteCity = deleteCity;
//# sourceMappingURL=cityControllers.js.map