import mongoose, { Document } from "mongoose";
import { Schema } from "mongoose";

export interface JobType extends Document {
  title: string;
  jobType: string; // Remote or full time
  salary: number;
  department: string;
  description: string;
  status: string; // active or close
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
    enum: ["ONSITE", "REMOTE", "HYBRID"],
  },
  description: {
    type: String,
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
