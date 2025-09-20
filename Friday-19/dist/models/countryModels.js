import mongoose, { Document, Schema } from "mongoose";
const countrySchema = new Schema({
    countryName: { type: String, required: true, lowercase: true, unique: true },
}, {
    timestamps: true,
    collection: "countries",
});
const countryModel = mongoose.model("countries", countrySchema);
export default countryModel;
//# sourceMappingURL=countryModels.js.map