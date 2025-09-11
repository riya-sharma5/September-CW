import mongoose from "mongoose";
declare const countryModel: mongoose.Model<{
    countryName: string;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    countryName: string;
}, {}, mongoose.DefaultSchemaOptions> & {
    countryName: string;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    countryName: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    countryName: string;
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    countryName: string;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export { countryModel };
//# sourceMappingURL=countryModels.d.ts.map