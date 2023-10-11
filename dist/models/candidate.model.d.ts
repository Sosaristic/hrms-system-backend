import mongoose, { Document } from "mongoose";
import { JobType } from "./job.model";
export interface Candidate extends Document {
    name: string;
    email: string;
    candidateStatus: string;
    job: JobType;
    phoneNumber: number;
    resume: string;
}
export declare const CandidateModel: mongoose.Model<Candidate, {}, {}, {}, mongoose.Document<unknown, {}, Candidate> & Candidate & {
    _id: mongoose.Types.ObjectId;
}, any>;
