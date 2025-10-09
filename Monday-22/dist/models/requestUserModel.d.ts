import mongoose, { Document } from "mongoose";
export declare enum statusType {
    pending = "0",
    accepted = "1",
    rejected = "2"
}
export interface IRequestUser extends Document {
    fromUserId: mongoose.Types.ObjectId;
    toUserId: mongoose.Types.ObjectId;
    status: statusType;
    content: string;
}
declare const _default: mongoose.Model<IRequestUser, {}, {}, {}, mongoose.Document<unknown, {}, IRequestUser, {}, {}> & IRequestUser & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=requestUserModel.d.ts.map