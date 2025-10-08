import mongoose, { Schema, Document } from "mongoose";
import { IUser } from './userModels'; 
export interface IAvailability extends Document {
  userId: mongoose.Types.ObjectId | IUser;

  expiry: Date;
}

const availabilitySchema: Schema<IAvailability> = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    expiry: { type: Date, required: true },
  },
  { timestamps: true, collections: "availabilties", versionKey: false }
);

//availabilitySchema.index({ expiry: 1 }, { expireAfterSeconds: 0 });

const availabilityModel = mongoose.model<IAvailability>(
  "availabilities",
  availabilitySchema
);
export default availabilityModel;




