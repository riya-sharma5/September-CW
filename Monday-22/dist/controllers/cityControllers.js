import cityModel from "../models/cityModels.js";
export const getAllCities = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const result = await cityModel.aggregate([
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
export const createCity = async (req, res, next) => {
    try {
        const { cityName, stateId } = req.body;
        const exists = await cityModel.findOne({
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
        const city = new cityModel({
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
export const cityList = async (req, res, next) => {
    try {
        const { stateId, countryId } = req.body;
        const cities = await cityModel
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
export const updateCity = async (req, res, next) => {
    try {
        const { _id, cityName } = req.body;
        const updatedCity = await cityModel.findByIdAndUpdate(_id, { cityName: cityName.trim() }, { new: true });
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
export const deleteCity = async (req, res, next) => {
    try {
        const { cityName } = req.body;
        const deleted = await cityModel.findOneAndDelete({
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
//# sourceMappingURL=cityControllers.js.map