import mongoose, { Document } from "mongoose";
import { IUser } from "./userModels";
export interface IAvailability extends Document {
    userId: mongoose.Types.ObjectId | IUser;
    expiry: Date;
}
declare const availabilityModel: mongoose.Model<IAvailability, {}, {}, {}, mongoose.Document<unknown, {}, IAvailability, {}, {}> & IAvailability & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default availabilityModel;
//# sourceMappingURL=availableModels.d.ts.map