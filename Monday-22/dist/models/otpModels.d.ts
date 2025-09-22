import mongoose, { Document } from "mongoose";
export interface IOtp extends Document {
    otp: String;
    email: string;
}
declare const stateModel: mongoose.Model<IOtp, {}, {}, {}, mongoose.Document<unknown, {}, IOtp, {}, {}> & IOtp & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default stateModel;
//# sourceMappingURL=otpModels.d.ts.map