import mongoose from "mongoose";
declare const stateModel: mongoose.Model<{
    stateName: string;
    countryId: mongoose.Types.ObjectId;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    stateName: string;
    countryId: mongoose.Types.ObjectId;
}, {}, mongoose.DefaultSchemaOptions> & {
    stateName: string;
    countryId: mongoose.Types.ObjectId;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    stateName: string;
    countryId: mongoose.Types.ObjectId;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    stateName: string;
    countryId: mongoose.Types.ObjectId;
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    stateName: string;
    countryId: mongoose.Types.ObjectId;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export { stateModel };
//# sourceMappingURL=stateModels.d.ts.map