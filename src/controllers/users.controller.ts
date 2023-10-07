import { UserModel } from "../models/users.model";

import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  resetPassword,
  requestPasswordReset,
  signup,
} from "../services/auth.service";

// Registration controller
export const register = async (req: Request, res: Response) => {
  
  const { name, email, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const data = {
    name,
    email,
    password: hashedPassword,
  };

  const signupService = await signup(data, res);

  return res.status(200).json(signupService);
};

// Login controller
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await UserModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create and sign JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const requestResetPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  const resetPasswordService = await requestPasswordReset(email, res);

  return res.status(200).json(resetPasswordService);
};

export const passwordReset = async (req: Request, res: Response) => {

  const { userId, token, password } = req.body;

  const resetPasswordService = await resetPassword(
    userId,
    token,
    password,
    res,
  );

  return res.status(200).json(resetPasswordService);
};

// Logout controller
export const logout = async (req: Request, res: Response) => {
  try {
   
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUsers = () => UserModel.find();

export const getUsersByEmail = (email: string) => UserModel.findOne({ email });

export const getUsersBySessionToken = (sessionToken: string) =>
  UserModel.findOne({ "autentication.sessionToken": sessionToken });

export const createUser = (values: Record<string, number>) =>
  new UserModel(values).save().then((user) => user.toObject());

export const deleteUserById = (id: string) =>
  UserModel.findOneAndDelete({ _id: id });

export const updateUserById = (id: string, values: Record<string, number>) =>
  UserModel.findByIdAndUpdate(id, values);
