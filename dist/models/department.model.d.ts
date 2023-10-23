import mongoose, { Document } from "mongoose";
export interface DepartmentType extends Document {
  name: string;
  departmentHead: string;
}
export declare const DepartmentModel: mongoose.Model<
  DepartmentType,
  {},
  {},
  {},
  mongoose.Document<unknown, {}, DepartmentType> &
    DepartmentType & {
      _id: mongoose.Types.ObjectId;
    },
  any
>;
