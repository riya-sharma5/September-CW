import mongoose from "mongoose";
const countrySchema = new mongoose.Schema({
    countryName: { type: String, required: true, unique: true },
});
const countryModel = mongoose.model("country", countrySchema);
export { countryModel };
//# sourceMappingURL=countryModels.js.map