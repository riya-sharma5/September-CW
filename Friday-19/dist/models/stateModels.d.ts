import mongoose, { Document, Types } from "mongoose";
export interface IState extends Document {
    stateName: String;
    countryId: Types.ObjectId;
}
declare const stateModel: mongoose.Model<IState, {}, {}, {}, mongoose.Document<unknown, {}, IState, {}, {}> & IState & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default stateModel;
//# sourceMappingURL=stateModels.d.ts.map