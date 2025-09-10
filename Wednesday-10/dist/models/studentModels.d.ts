import mongoose from 'mongoose';
declare const StudentModel: mongoose.Model<{
    rollno: number;
    name: string;
    collegeName: string;
    course: string;
    password: string;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    rollno: number;
    name: string;
    collegeName: string;
    course: string;
    password: string;
}, {}, mongoose.DefaultSchemaOptions> & {
    rollno: number;
    name: string;
    collegeName: string;
    course: string;
    password: string;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    rollno: number;
    name: string;
    collegeName: string;
    course: string;
    password: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    rollno: number;
    name: string;
    collegeName: string;
    course: string;
    password: string;
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    rollno: number;
    name: string;
    collegeName: string;
    course: string;
    password: string;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export { StudentModel };
//# sourceMappingURL=studentModels.d.ts.map