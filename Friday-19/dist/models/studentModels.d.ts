import mongoose, { Document, Types } from "mongoose";
export interface IStudent extends Document {
    rollNo: number;
    name: string;
    password: string;
    collegeName: string;
    course: string;
    country: Types.ObjectId;
    state: Types.ObjectId;
    city: Types.ObjectId;
}
declare const studentModel: mongoose.Model<IStudent, {}, {}, {}, mongoose.Document<unknown, {}, IStudent, {}, {}> & IStudent & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default studentModel;
//# sourceMappingURL=studentModels.d.ts.map