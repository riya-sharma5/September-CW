import mongoose, { Document, Schema , Types } from "mongoose";

export interface IStudent extends Document {
  rollNo: number;
  name: string;
  password: string;
  collegeName: string;
  course: string;
  country: Types.ObjectId;
  state: Types.ObjectId;
  city: Types.ObjectId;
}

const studentSchema: Schema<IStudent> = new Schema(
  {
    rollNo: {
      type: Number,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
     
      type: String,
      required: true,
      trim: true,
    },
    collegeName: {
      type: String,
      required: true,
      trim: true,
    },
    course: {
      type: String,
      required: true,
      trim: true,
    },
    country: 
      {
        type: Schema.Types.ObjectId,
        ref:"country",
        required: true,
        unique: true,
      },
    state: 
      {
        type: Schema.Types.ObjectId,
        ref: "state",
        required: true,
        unique: true
      },
    
    city: 
      {
        type: Schema.Types.ObjectId,
        ref: "city",
        required: true,
        unique: true},
  },
  {
    timestamps: true,
    collection: "students",
  }
);

const studentModel = mongoose.model<IStudent>("students", studentSchema);
export default studentModel;
