import mongoose, { Document, Schema } from "mongoose";
const citySchema = new Schema({
    cityName: { type: String, required: true, unique: true },
    stateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "state",
        required: true,
    },
}, {
    timestamps: true,
    collection: "cities",
});
const cityModel = mongoose.model("cities", citySchema);
export default cityModel;
//# sourceMappingURL=cityModels.js.map