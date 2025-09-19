import mongoose, { Document } from "mongoose";
export interface IStudent extends Document {
    rollNo: number;
    name: string;
    password: string;
    collegeName: string;
    course: string;
    country: string;
    state: string;
    city: string;
}
declare const studentModel: mongoose.Model<IStudent, {}, {}, {}, mongoose.Document<unknown, {}, IStudent, {}, {}> & IStudent & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default studentModel;
//# sourceMappingURL=studentModels.d.ts.map