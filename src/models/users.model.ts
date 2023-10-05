import mongoose, { Document, Schema } from "mongoose";

export interface User extends Document {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  isStaff: boolean;
}

const userSchema: Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  role: {
    type: String,
    enum: ["ADMIN", "STAFF"],
    default: "STAFF",
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});

export const UserModel = mongoose.model<User>("User", userSchema);
