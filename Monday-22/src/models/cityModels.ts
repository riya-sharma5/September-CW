import mongoose, { Document, Schema, Types } from "mongoose";

export interface ICity extends Document {
  cityName: String;
  stateId: Types.ObjectId;
}

const citySchema: Schema<ICity> = new Schema(
  {
    cityName: { type: String, required: true, lowercase: true, unique: true },

    stateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "states",
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "cities",
    versionKey: false,
  }
);
const cityModel = mongoose.model<ICity>("cities", citySchema);
export default cityModel;
