import mongoose, { Document, Schema } from "mongoose";

export interface UserType extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  emailVerified: boolean;
  refreshToken: string;
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
  emailVerified: {
    type: Boolean,
    default: false,
  },
  refreshToken: {
    type: String,
    select: false,
  },
});

export const UserModel = mongoose.model<UserType>("User", userSchema);
