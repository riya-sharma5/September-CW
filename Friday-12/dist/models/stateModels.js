import mongoose, { Document, Schema } from "mongoose";
const stateSchema = new Schema({
    stateName: { type: String, unique: true, required: true },
    countryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "country",
        required: true,
    },
}, {
    timestamps: true,
    collection: "states",
});
const stateModel = mongoose.model("states", stateSchema);
export default stateModel;
//# sourceMappingURL=stateModels.js.map