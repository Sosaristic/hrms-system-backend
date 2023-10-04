import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  employmentStatus: {
    type: String,
    enum: ["ACTIVE", "ON BOARDING", "ON LEAVE"],
  },
  employmentType: {
    type: String,
    enum: ["FULL TIME", "PART TIME", "CONTRACT"],
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
    type: String,
  },
});

export const EmployeeModel = mongoose.model("Employee", employeeSchema);
