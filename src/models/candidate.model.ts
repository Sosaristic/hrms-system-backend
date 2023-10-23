import mongoose, { Document, Schema } from "mongoose";
import { JobType } from "./job.model";

export interface Candidate extends Document {
  name: string;
  email: string;
  candidateStatus: string;
  job: JobType;
  phoneNumber: number;
  resume: string;
}

const candidateSchema: Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    candidateStatus: {
      type: String,
      enum: ["SELECTED", "IN PROGRESS", "REJECTED"],
      default: "IN PROGRESS",
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      require: true,
    },
    resume: {
      type: String,
      require: true,
    },
    phoneNumber: {
      type: Number,
    },
  },
  { timestamps: true },
);

export const CandidateModel = mongoose.model<Candidate>(
  "Candidate",
  candidateSchema,
);
