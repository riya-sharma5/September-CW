import mongoose, { Document, Schema, Types } from "mongoose";
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    OTP: {
        type: String,
        default: null
    },
    otpExpires: {
        type: Date,
        default: null
    },
    gender: {
        type: String,
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
    collection: "users",
});
const userModel = mongoose.model("users", userSchema);
export default userModel;
//# sourceMappingURL=userModels.js.map