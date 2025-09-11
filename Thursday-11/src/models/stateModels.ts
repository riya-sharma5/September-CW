import mongoose from "mongoose";

const stateSchema = new mongoose.Schema({
  stateName: { type: String, required: true, unique: true },
  countryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "country",
    required: true,
  },
});

const stateModel = mongoose.model("state", stateSchema);
export { stateModel };
