import mongoose, { Document } from "mongoose";
import { Schema } from "mongoose";

export interface Department extends Document {
  name: string;
  departmentHead: string;
}

const DepartmentSchema: Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  departmentHead: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
  },
});

export const DepartmentModel = mongoose.model<Department>(
  "Department",
  DepartmentSchema
);
