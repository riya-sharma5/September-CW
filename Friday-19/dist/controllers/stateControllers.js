import stateModel from "../models/stateModels.js";
export const getAllStates = async (req, res, next) => {
    try {
        const states = await stateModel.find()
            .populate("countryId", "countryName")
            .exec();
        res
            .status(200)
            .json({ code: 200, message: "got all states", data: states });
    }
    catch (error) {
        res;
        next(error);
    }
};
export const createState = async (req, res, next) => {
    try {
        const { stateName, countryId } = req.body;
        if (!stateName ||
            typeof stateName !== "string" ||
            stateName.trim() === "") {
            return res
                .status(400)
                .json({ code: 400, message: "state name is required!", data: [] });
        }
        if (!countryId || typeof countryId !== "string") {
            return res
                .status(400)
                .json({ code: 400, message: "country Id is required !", data: [] });
        }
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
export const updateState = async (req, res, next) => {
    try {
        const { _id, stateName } = req.body;
        if (!_id)
            return res
                .status(400)
                .json({ code: 400, message: "_id is required", data: [] });
        if (!stateName ||
            typeof stateName !== "string" ||
            stateName.trim() === "") {
            return res
                .status(400)
                .json({ code: 400, message: "Invalid Input", data: [] });
        }
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
export const deleteState = async (req, res) => {
    try {
        const { stateName } = req.body;
        if (!stateName)
            return res.status(400).json({ code: 400, message: "State name is required", data: [] });
        const deleted = await stateModel.findOneAndDelete(stateName);
        if (!deleted)
            return res.status(404).json({ code: 404, message: "State not found", data: [] });
        res.status(200).json({ code: 200, message: "State deleted successfully", data: [] });
    }
    catch (error) {
        res.status(500).json({ code: 500, message: "Failed to delete state", data: [] });
    }
};
//# sourceMappingURL=stateControllers.js.map