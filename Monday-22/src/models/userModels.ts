import mongoose, { Document, Schema, Types } from "mongoose";

export interface IUser extends Document {
  name: string;
  password: string;
  email: string;
  gender: string;
  pincode: string,
  profilePictureURL: string,
  country: Types.ObjectId;
  state: Types.ObjectId;
  city: Types.ObjectId;
  OTP?: string| null;
  otpExpires?: Date | string|  null;
}

const userSchema: Schema<IUser> = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },

    OTP: {
      type: String,
     default: null
    },

    profilePictureURL: {
       type: String,

    },

    otpExpires: {
      type: Date,
      default: null
    },

    gender: {
      type: String,
      required: true,
    },


    pincode: {
      type: String,
      required: true
    }, 

    password: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    country: {
      type: Schema.Types.ObjectId,
      ref: "countries",
      required: true,
    },

    state: {
      type: Schema.Types.ObjectId,
      ref: "states",
      required: true,
    },

    city: {
      type: Schema.Types.ObjectId,
      ref: "cities",
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

const userModel = mongoose.model<IUser>("users", userSchema);
export default userModel;
