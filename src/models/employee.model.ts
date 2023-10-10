import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  employmentStatus: {
    type: String,
    enum: ["ACTIVE", "ON LEAVE"],
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
  gender: {
    type: String,
    enum: ["MALE", "FEMALE"],
  },
  jobTitle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
  },
});

export const EmployeeModel = mongoose.model("Employee", employeeSchema);
