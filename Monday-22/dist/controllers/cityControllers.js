"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCity = exports.updateCity = exports.cityList = exports.createCity = exports.getAllCities = void 0;
const cityModels_1 = __importDefault(require("../models/cityModels"));
const getAllCities = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const result = await cityModels_1.default.aggregate([
            {
                $facet: {
                    data: [{ $skip: skip }, { $limit: limit }],
                    total: [{ $count: "totalCities" }],
                },
            },
        ]);
        const data = result[0].data;
        const total = result[0].total[0]?.totalCities || 0;
        const totalPages = Math.ceil(total / limit);
        res.status(200).json({
            code: 200,
            message: "Got all cities",
            data,
            pagination: {
                totalCities: total,
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
exports.getAllCities = getAllCities;
const createCity = async (req, res, next) => {
    try {
        const { cityName, stateId } = req.body;
        const exists = await cityModels_1.default.findOne({
            cityName: cityName.trim(),
            stateId: stateId.trim(),
        });
        if (exists) {
            return res.status(400).json({
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