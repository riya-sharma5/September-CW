import mongoose, { Document, Types } from "mongoose";
export interface IUser extends Document {
    name: string;
    password: string;
    email: string;
    gender: string;
    pincode: string;
    profilePictureURL: string;
    country: Types.ObjectId;
    state: Types.ObjectId;
    city: Types.ObjectId;
    OTP?: string | null;
    otpExpires?: Date | string | null;
}
declare const userModel: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default userModel;
//# sourceMappingURL=userModels.d.ts.map