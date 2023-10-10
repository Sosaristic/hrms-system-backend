import mongoose, { Document } from "mongoose";
import { Schema } from "mongoose";

export interface JobType extends Document {
  title: string;
  jobType: string;
  amount: number;
  department: string;
  status: string;
}

const JobSchema: Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  jobType: {
    type: String,
    enum: ["FULL TIME", "REMOTE"],
  },
  status: {
    type: String,
    enum: ["ACTIVE", "CLOSE"],
    default: "ACTIVE",
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
  },
});

export const JobModel = mongoose.model<JobType>("Job", JobSchema);
