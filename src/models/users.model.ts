import mongoose, { Document, Schema } from "mongoose";

import bcrypt from "bcrypt";

export interface User extends Document {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  isStaff: boolean;
}

const userSchema: Schema = new mongoose.Schema(
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
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this || !this.isModified || !this.isModified("password")) {
    return next();
  }
  const hash = await bcrypt.hash(this.password, Number(process.env.BCRYPT_SALT));

  this.password = hash;
  next()
});

export const UserModel = mongoose.model<User>("User", userSchema);
