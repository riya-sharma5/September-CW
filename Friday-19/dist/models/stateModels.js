import mongoose, { Document, Schema, Types } from "mongoose";
const stateSchema = new Schema({
    stateName: { type: String, unique: true, lowercase: true, required: true },
    countryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "countries",
        required: true,
    },
}, {
    timestamps: true,
    collection: "states",
});
const stateModel = mongoose.model("states", stateSchema);
export default stateModel;
//# sourceMappingURL=stateModels.js.map