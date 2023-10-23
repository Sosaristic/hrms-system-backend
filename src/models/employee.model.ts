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

const employeeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  employmentStatus: {
    type: String,
    enum: ["ACTIVE", "ON LEAVE"],
    default: "ACTIVE",
  },
  imageUrl: {
    type: String,
  },
  joinDate: {
    type: Date,
    default: Date.now,
  },
  phoneNumber: {
    type: Number,
  },
  salary: {
    type: Number,
  },
  gender: {
    type: String,
    enum: ["MALE", "FEMALE"],
  },
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
  },
});

export const EmployeeModel = mongoose.model<Employee>(
  "Employee",
  employeeSchema,
);
