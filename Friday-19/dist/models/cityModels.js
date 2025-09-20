import mongoose, { Document, Schema, Types } from "mongoose";
const citySchema = new Schema({
    cityName: { type: String, required: true, lowercase: true, unique: true },
    stateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "states",
        required: true,
    },
}, {
    timestamps: true,
    collection: "cities",
});
const cityModel = mongoose.model("cities", citySchema);
export default cityModel;
//# sourceMappingURL=cityModels.js.map