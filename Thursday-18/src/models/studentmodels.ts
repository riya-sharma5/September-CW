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
        ref: "countries",
        required: true,
      },
    state: 
      {
        type: Schema.Types.ObjectId,
        ref: "states",
        required: true,
      },
    
    city: 
      {
        type: Schema.Types.ObjectId,
        ref: "cities",
        required: true,
      },
  },

  {
    timestamps: true,
    collection: "students",
  }
);

const studentModel = mongoose.model<IStudent>("students", studentSchema);
export default studentModel;
