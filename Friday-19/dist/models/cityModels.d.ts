import mongoose, { Document, Types } from "mongoose";
export interface ICity extends Document {
    cityName: String;
    stateId: Types.ObjectId;
}
declare const cityModel: mongoose.Model<ICity, {}, {}, {}, mongoose.Document<unknown, {}, ICity, {}, {}> & ICity & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default cityModel;
//# sourceMappingURL=cityModels.d.ts.map