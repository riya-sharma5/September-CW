import mongoose, { Document, Schema } from "mongoose";

export interface ICity extends Document {
  cityName: String;
  stateId: String;
}

const citySchema: Schema<ICity> = new Schema(
  {
    cityName: { type: String, required: true, unique: true },

    stateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "state",
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "cities",
  }
);
const cityModel = mongoose.model<ICity>("cities", citySchema);
export default cityModel;
