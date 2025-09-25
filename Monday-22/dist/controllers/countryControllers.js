import countryModel from "../models/countryModels.js";
import { createCountryValidation, updateCountryValidation, deleteCountryValidation, listCountryValidation } from "../utils/validationCountry.js";
export const getAllCountries = async (req, res, next) => {
    try {
        await listCountryValidation.validateAsync(req.params);
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const [countries, totalcountries] = await Promise.all([
            countryModel.find().skip(skip).limit(limit).exec(),
            countryModel.countDocuments(),
        ]);
        res.status(200).json({
            code: 200,
            message: "got all countries",
            data: countries,
            pagination: {
                total: totalcountries,
                page,
                limit,
                totalPages: Math.ceil(totalcountries / limit),
            },
        });
    }
    catch (error) {
        next(error);
    }
};
export const createCountry = async (req, res, next) => {
    try {
        await createCountryValidation.validateAsync(req.body);
        const { countryName } = req.body;
        const exists = await countryModel.findOne({
            countryName: countryName.trim(),
        });
        if (exists) {
            return res
                .status(400)
                .json({ code: 400, message: "Country already exists", data: [] });
        }
        const country = new countryModel({ countryName: countryName.trim() });
        await country.save();
        res
            .status(201)
            .json({
            code: 201,
            message: "successfulluy created the country",
            data: country,
        });
    }
    catch (error) {
        next(error);
    }
};
export const updateCountry = async (req, res, next) => {
    try {
        await updateCountryValidation.validateAsync(req.body);
        const { _id, countryName } = req.body;
        const country = await countryModel.findByIdAndUpdate(_id, { countryName: countryName.trim() }, { new: true });
        if (!country)
            return res
                .status(404)
                .json({ code: 404, message: "Country not found", data: [] });
        res
            .status(200)
            .json({
            code: 200,
            message: "successfully updated the country",
            data: country,
        });
    }
    catch (error) {
        next(error);
    }
};
export const deleteCountry = async (req, res, next) => {
    try {
        await deleteCountryValidation.validateAsync(req.body);
        const { countryName } = req.body;
        const deleted = await countryModel.findOneAndDelete({
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
//# sourceMappingURL=countryControllers.js.map