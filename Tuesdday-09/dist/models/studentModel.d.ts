import mongoose from 'mongoose';
declare const Student: mongoose.Model<{
    rollno: number;
    name: string;
    collegeName: string;
    course: string;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    rollno: number;
    name: string;
    collegeName: string;
    course: string;
}, {}, mongoose.DefaultSchemaOptions> & {
    rollno: number;
    name: string;
    collegeName: string;
    course: string;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    rollno: number;
    name: string;
    collegeName: string;
    course: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    rollno: number;
    name: string;
    collegeName: string;
    course: string;
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    rollno: number;
    name: string;
    collegeName: string;
    course: string;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default Student;
//# sourceMappingURL=studentModel.d.ts.map