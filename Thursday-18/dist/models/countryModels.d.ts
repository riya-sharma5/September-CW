import mongoose, { Document } from "mongoose";
export interface ICountry extends Document {
    countryName: string;
}
declare const countryModel: mongoose.Model<ICountry, {}, {}, {}, mongoose.Document<unknown, {}, ICountry, {}, {}> & ICountry & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default countryModel;
//# sourceMappingURL=countryModels.d.ts.map