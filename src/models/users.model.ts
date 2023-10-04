import mongoose, { Document, Schema } from "mongoose";

export interface User extends Document {
  name: string;
  email: string;
  password: string;
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
  
});

export const UserModel =  mongoose.model<User>("User", userSchema);
