import mongoose, { Document } from "mongoose";
import { Schema } from "mongoose";

export interface DepartmentType extends Document {
  name: string;
  departmentHead: string;
}

const DepartmentSchema: Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  departmentHead: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
  },
});

export const DepartmentModel = mongoose.model<DepartmentType>(
  "Department",
  DepartmentSchema,
);
