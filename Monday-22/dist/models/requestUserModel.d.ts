import mongoose, { Document } from "mongoose";
export declare enum statusType {
    pending = "0",
    accepted = "1",
    rejected = "2",
    closed = "3"
}
export declare enum preferenceType {
    "I can Drive" = "0",
    "I need a ride" = "1"
}
export declare enum responseType {
    "Yes! Text Me" = "0",
    "Yes! Call Me" = "1",
    "I Can't Right" = "2",
    "Possibly Later" = "3",
    "Text Me" = "4",
    "Call Me" = "5"
}
export interface IRequestUser extends Document {
    fromUserId: mongoose.Types.ObjectId;
    toUserId: mongoose.Types.ObjectId;
    status: statusType;
    content: preferenceType;
    additionalPassengers?: number;
}
declare const _default: mongoose.Model<IRequestUser, {}, {}, {}, mongoose.Document<unknown, {}, IRequestUser, {}, {}> & IRequestUser & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=requestUserModel.d.ts.map