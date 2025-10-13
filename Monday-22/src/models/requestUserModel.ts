import mongoose, { Schema, Document } from "mongoose";

export enum statusType {
  pending = "0",
  accepted = "1",
  rejected = "2",
  closed = "3"
}

export enum preferenceType {
  "I can Drive" = "0",
  "I need a ride" = "1",
}

export enum responseType {
  "Yes! Text Me" = "0",
  "Yes! Call Me" = "1",
  "I Can't Right" = "2",
  "Possibly Later" = "3",
  "Text Me" = "4",
  "Call Me" = "5",
}

export interface IRequestUser extends Document {
  fromUserId: mongoose.Types.ObjectId;
  toUserId: mongoose.Types.ObjectId;
  status: statusType;
  content: preferenceType;
  additionalPassengers?: number;
}

const requestUserSchema: Schema = new Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: statusType,
      default: "0",
    },
    content: {
      type: String,
      enum: preferenceType,
      required: true,
    },
    additionalPassengers: {
      type: Number,
      required: false,
    }
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false,
  }
);

export default mongoose.model<IRequestUser>("RequestUser", requestUserSchema);

