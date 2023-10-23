import mongoose, { Document } from "mongoose";
import { UserType } from "./users.model";
import { JobType } from "./job.model";
import { DepartmentType } from "./department.model";
export interface Employee extends Document {
  user: UserType;
  employmentStatus: string;
  imageUrl: string;
  joinDate: Date;
  phoneNumber: number;
  salary: number;
  gender: string;
  job: JobType;
  department: DepartmentType;
}
export declare const EmployeeModel: mongoose.Model<
  Employee,
  {},
  {},
  {},
  mongoose.Document<unknown, {}, Employee> &
    Employee & {
      _id: mongoose.Types.ObjectId;
    },
  any
>;
