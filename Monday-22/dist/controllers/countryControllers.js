"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCountry = exports.updateCountry = exports.createCountry = exports.getAllCountries = void 0;
const countryModels_1 = __importDefault(require("../models/countryModels"));
const getAllCountries = async (req, res, next) => {
    try {
        console.log("into country list api");
        const { page: pageNo, limit: limitNo } = req.query;
        console.log("page no :", pageNo, "limit no :", limitNo);
        console.log("query :::", req.query);
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const result = await countryModels_1.default.aggregate([
            {
                $facet: {
                    data: [{ $skip: skip }, { $limit: limit }],
                    total: [{ $count: "totalCountries" }],
                },
            },
        ]);
        let data = result?.[0]?.data ?? [];
        let total = result?.[0]?.total?.[0]?.totalCountries ?? 0;
        res.status(200).json({
            code: 200,
            message: "Got all countries",
            data,
            pagination: {
                totalCountries: total,
                totalPages: Math.ceil(total / limit),
                currentPage: page,
                pageSize: limit,
            },
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getAllCountries = getAllCountries;
const createCountry = async (req, res, next) => {
    try {
        const { countryName } = req.body;
        const exists = await countryModels_1.default.findOne({
            countryName: countryName.trim(),
        });
        if (exists) {
            return res
                .status(400)
                .json({ code: 400, message: "Country already exists", data: [] });
        }
        const country = new countryModels_1.default({ countryName: countryName.trim() });
        await country.save();
        res.status(201).json({
            code: 201,
            message: "successfulluy created the country",
            data: country,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createCountry = createCountry;
const updateCountry = async (req, res, next) => {
    try {
        const { _id, countryName } = req.body;
        const country = await countryModels_1.default.findByIdAndUpdate(_id, { countryName: countryName.trim() }, { new: true });
        if (!country)
            return res
                .status(404)
                .json({ code: 404, message: "Country not found", data: [] });
        res.status(200).json({
            code: 200,
            message: "successfully updated the country",
            data: country,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateCountry = updateCountry;
const deleteCountry = async (req, res, next) => {
    try {
        const { countryName } = req.body;
        const deleted = await countryModels_1.default.findOneAndDelete({
            countryName: countryName,
        });
        if (!deleted)
            return res
                .status(404)
                .json({ code: 404, message: "Country not found", data: [] });
        res
            .status(200)
            .json({ code: 200, message: "Country deleted successfully", data: [] });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteCountry = deleteCountry;
//# sourceMappingURL=countryControllers.js.map