import { stateModel } from '../models/stateModels.js';
export const getAllStates = async (req, res) => {
    const states = await stateModel.find();
    res.json(states);
};
export const createState = async (req, res) => {
    const state = new stateModel({ stateName: req.body.stateName, countryId: req.body.countryId });
    const exists = await stateModel.findOne({ stateName: req.body.stateName });
    if (exists)
        return res.status(400).json({ error: "state already exists" });
    await state.save();
    res.status(201).json(state);
};
export const updateState = async (req, res) => {
    const state = await stateModel.findByIdAndUpdate(req.params.id, {
        stateName: req.body.stateName,
        countryId: req.body.countryId
    }, { new: true });
    res.json(state);
};
export const deleteState = async (req, res) => {
    try {
        const { stateName } = req.body;
        const deleted = await stateModel.findOneAndDelete({ stateName });
        if (!deleted)
            return res.status(404).json({ error: "state not found" });
        res.json({ message: "State deleted successfully" });
    }
    catch {
        res.status(500).json({ error: "Server error" });
    }
};
//# sourceMappingURL=stateController.js.map