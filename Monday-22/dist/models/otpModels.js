import mongoose, { Document, Schema, Types } from "mongoose";
const otpSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    OTP: { type: String },
    OTPCreatedTime: { type: Date },
    OTPAttempts: { type: Number, default: 0 },
    isBlocked: { type: Boolean, default: false },
    blockUntil: { type: Date },
}, {
    timestamps: true,
    collection: "otp",
});
const stateModel = mongoose.model("states", otpSchema);
export default stateModel;
//# sourceMappingURL=otpModels.js.map