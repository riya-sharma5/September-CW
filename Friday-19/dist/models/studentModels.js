import mongoose, { Document, Schema, Types } from "mongoose";
const studentSchema = new Schema({
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
        lowercase: true,
        trim: true,
    },
    collegeName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    course: {
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
}, {
    timestamps: true,
    collection: "students",
});
const studentModel = mongoose.model("students", studentSchema);
export default studentModel;
//# sourceMappingURL=studentModels.js.map