import mongoose from "mongoose";
const citySchema = new mongoose.Schema({
    cityName: { type: String, required: true, unique: true },
    stateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "state",
        required: true,
    },
});
const cityModel = mongoose.model("city", citySchema);
export { cityModel };
//# sourceMappingURL=cityModels.js.map