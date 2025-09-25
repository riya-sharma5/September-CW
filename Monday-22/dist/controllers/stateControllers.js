import stateModel from "../models/stateModels.js";
import { createStateValidation, listStateValidation, deleteStateValidation, updateStateValidation, getAllStatesValidation } from "../utils/validationState.js";
export const getAllStates = async (req, res, next) => {
    try {
        await getAllStatesValidation.validateAsync(req.params);
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const [states, totalstates] = await Promise.all([
            stateModel
                .find()
                .populate("countryId", "countryName")
                .skip(skip)
                .limit(limit)
                .exec(),
            stateModel.countDocuments(),
        ]);
        res.status(200).json({
            code: 200,
            message: "got all states",
            data: states,
            pagination: {
                total: totalstates,
                page,
                limit,
                totalPages: Math.ceil(totalstates / limit),
            },
        });
    }
    catch (error) {
        res;
        next(error);
    }
};
export const createState = async (req, res, next) => {
    try {
        await createStateValidation.validateAsync(req.body);
        const { stateName, countryId } = req.body;
        const exists = await stateModel.findOne({ stateName: stateName.trim() });
        if (exists) {
            return res
                .status(400)
                .json({ code: 400, message: "State already exists", data: [] });
        }
        const state = new stateModel({
            stateName: stateName.trim(),
            countryId: countryId.trim(),
        });
        await state.save();
        res
            .status(201)
            .json({ code: 201, message: "successfully created state", data: state });
    }
    catch (error) {
        next(error);
    }
};
export const stateList = async (req, res, next) => {
    try {
        await listStateValidation.validateAsync(req.body);
        const { countryId } = req.body;
        const states = await stateModel
            .find({ countryId })
            .populate("countryId", "countryName")
            .exec();
        if (states.length === 0) {
            return res.status(404).json({
                code: 404,
                message: "No states found for this country",
                data: [],
            });
        }
        res.status(200).json({
            code: 200,
            message: "States fetched successfully",
            data: states,
        });
    }
    catch (error) {
        next(error);
    }
};
export const updateState = async (req, res, next) => {
    try {
        await updateStateValidation.validateAsync(req.body);
        const { _id, stateName } = req.body;
        const state = await stateModel.findByIdAndUpdate(_id, { stateName: stateName.trim() }, { new: true });
        if (!state)
            return res
                .status(404)
                .json({ code: 404, message: "State not found", data: [] });
        res.status(200).json({
            code: 200,
            message: "successfully updated the state",
            data: state,
        });
    }
    catch (error) {
        next(error);
    }
};
export const deleteState = async (req, res, next) => {
    try {
        await deleteStateValidation.validateAsync(req.body);
        const { stateName } = req.body;
        const deleted = await stateModel.findOneAndDelete({ stateName: stateName });
        if (!deleted)
            return res
                .status(404)
                .json({ code: 404, message: "State not found", data: [] });
        res
            .status(200)
            .json({ code: 200, message: "State deleted successfully", data: [] });
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=stateControllers.js.map