import countryModel from "../models/countryModels.js";
export const getAllCountries = async (req, res, next) => {
    try {
        const countries = await countryModel.find();
        res.status(200).json({ code: 200, message: "got all countries", data: countries });
    }
    catch (error) {
        next(error);
    }
};
export const createCountry = async (req, res, next) => {
    try {
        const { countryName } = req.body;
        if (!countryName || typeof countryName !== "string" || countryName.trim() === "") {
            return res.status(400).json({ code: 400, message: "Invalid Input", data: [] });
        }
        const exists = await countryModel.findOne({ countryName: countryName.trim() });
        if (exists) {
            return res.status(400).json({ code: 400, message: "Country already exists", data: [] });
        }
        const country = new countryModel({ countryName: countryName.trim() });
        await country.save();
        res.status(201).json({ code: 201, message: "successfulluy created the country", data: country });
    }
    catch (error) {
        next(error);
    }
};
export const updateCountry = async (req, res, next) => {
    try {
        const { _id, countryName } = req.body;
        if (!_id)
            return res.status(400).json({ code: 400, message: "_id is required", data: [] });
        if (!countryName || typeof countryName !== "string" || countryName.trim() === "") {
            return res.status(400).json({ code: 400, message: "Invalid Input", data: [] });
        }
        const country = await countryModel.findByIdAndUpdate(_id, { countryName: countryName.trim() }, { new: true });
        if (!country)
            return res.status(404).json({ code: 404, message: "Country not found", data: [] });
        res.status(200).json({ code: 200, message: "successfully updated the country", data: country });
    }
    catch (error) {
        next(error);
    }
};
export const deleteCountry = async (req, res, next) => {
    try {
        const { countryName } = req.body;
        if (!countryName)
            return res.status(400).json({ code: 400, message: "countryName is required", data: [] });
        const deleted = await countryModel.findOneAndDelete(countryName);
        if (!deleted)
            return res.status(404).json({ code: 404, message: "Country not found", data: [] });
        res.status(200).json({ code: 200, message: "Country deleted successfully", data: [] });
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=countryControllers.js.map