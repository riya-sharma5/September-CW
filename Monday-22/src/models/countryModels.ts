import mongoose, { Document, Schema } from "mongoose";

export interface ICountry extends Document {
  countryName: string;
}

const countrySchema: Schema<ICountry> = new Schema(
  {
    countryName: { type: String, required: true, lowercase: true, unique: true },
  },
  {
    timestamps: true,
    collection: "countries",
    versionKey: false,
  }
);
const countryModel = mongoose.model<ICountry>("countries", countrySchema);
export default countryModel;
