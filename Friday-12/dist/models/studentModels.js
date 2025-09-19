import mongoose, { Document, Schema } from "mongoose";
const studentSchema = new Schema({
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
    country: [
        {
            type: String,
            required: true,
            unique: true,
        },
    ],
    state: [
        {
            type: Schema.Types.ObjectId,
            ref: "country",
            required: true,
            unique: true
        },
    ],
    city: [
        {
            type: Schema.Types.ObjectId,
            ref: "state",
            required: true,
            unique: true
        },
    ],
}, {
    timestamps: true,
    collection: "students",
});
const studentModel = mongoose.model("students", studentSchema);
export default studentModel;
//# sourceMappingURL=studentModels.js.map