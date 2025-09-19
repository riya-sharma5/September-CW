import mongoose, { Document, Schema } from "mongoose";


export interface IState extends Document {
  stateName: String;
  countryId: String;
}

const stateSchema: Schema<IState> = new Schema(
  {
    stateName: { type: String, unique: true, required: true },

    countryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "country",
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "states",
  }
);
const stateModel = mongoose.model<IState>("states", stateSchema);
export default stateModel;
