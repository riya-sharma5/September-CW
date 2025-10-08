import mongoose, { Document, Schema, Types } from "mongoose";


export interface IState extends Document {
  stateName: String;
  countryId: Types.ObjectId;
}

const stateSchema: Schema<IState> = new Schema(
  {
    stateName: { type: String, unique: true, lowercase: true, required: true },

    countryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "countries",
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "states",
    versionKey: false,
  }
);
const stateModel = mongoose.model<IState>("states", stateSchema);
export default stateModel;
