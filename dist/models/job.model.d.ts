import mongoose, { Document } from "mongoose";
export interface JobType extends Document {
  title: string;
  jobType: string;
  salary: number;
  department: string;
  description: string;
  status: string;
}
export declare const JobModel: mongoose.Model<
  JobType,
  {},
  {},
  {},
  mongoose.Document<unknown, {}, JobType> &
    JobType & {
      _id: mongoose.Types.ObjectId;
    },
  any
>;
