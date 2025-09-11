import mongoose from "mongoose";
declare const cityModel: mongoose.Model<{
    cityName: string;
    stateId: mongoose.Types.ObjectId;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    cityName: string;
    stateId: mongoose.Types.ObjectId;
}, {}, mongoose.DefaultSchemaOptions> & {
    cityName: string;
    stateId: mongoose.Types.ObjectId;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    cityName: string;
    stateId: mongoose.Types.ObjectId;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    cityName: string;
    stateId: mongoose.Types.ObjectId;
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    cityName: string;
    stateId: mongoose.Types.ObjectId;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export { cityModel };
//# sourceMappingURL=cityModels.d.ts.map