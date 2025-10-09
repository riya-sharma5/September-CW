import mongoose, { Schema, Document } from "mongoose";

export enum statusType {
  pending = "0",
  accepted = "1",
  rejected = "2",
}


export interface IRequestUser extends Document {
  fromUserId: mongoose.Types.ObjectId;
  toUserId: mongoose.Types.ObjectId;
  status: statusType;
  content: string;
}

const requestUserSchema: Schema = new Schema(
  {
    fromUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    toUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      status: {
      type: String,
      enum: statusType,
      deafult: statusType.pending,

    },

    content: {
        type: String
    }
  },
  { timestamps: { createdAt: true, updatedAt: false,  },
versionKey: false,}
);

export default mongoose.model<IRequestUser>("RequestUser", requestUserSchema);
