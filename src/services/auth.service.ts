import JWT from "jsonwebtoken";

import { User, UserModel } from "../models/users.model";
import { TokenModel } from "../models/token.model";

import { sendEmail } from "../utils/emails/sendEmail";

import bcrypt from "bcrypt";
import { generateRandomString } from "../utils/helpers";

export const signup = async (data, res) => {
  const existingUser = await UserModel.findOne({ email: data.email });

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user: User = new UserModel(data);
  const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET);
  await user.save();

  res.status(201).json({ message: "User created successfully" });

  return (data = {
    userId: user._id,
    email: user.email,
    name: user.name,
    token: token,
  });
};

export const requestPasswordReset = async (email, res) => {
  const user = await UserModel.findOne({ email });
  if (!user) throw new Error("User not found");

  const token = await TokenModel.findOne({ userId: user._id });

  if (token) {
    await token.deleteOne();
  }

  const resetToken = await generateRandomString(32);

  const hash = await bcrypt.hash(resetToken, Number(process.env.BCRYPT_SALT));

  await new TokenModel({
    userId: user._id,
    token: hash,
    createAt: Date.now(),
  }).save();

  const link = `${process.env.CLIENT_URL}/reset?token=${resetToken}&id=${user._id}`;

  sendEmail(
    user.email,
    process.env.RESET_REQUEST_MESSAGE,
    { name: user.name, link: link },
    res,
  );
  return { link };
};

export const resetPassword = async (userId, token, password, res) => {
  const passwordResetToken = await TokenModel.findOne({ userId });

  if (!passwordResetToken)
    throw new Error("Invalid or expired password reset token");

  // const isEqual = await bcrypt.compare(token, passwordResetToken.token);
  // if (!isEqual) throw new Error("Invalid or expired password reset token");

  const isMatch = await bcrypt.compare(token, passwordResetToken?.token);

  if (!isMatch) throw new Error("Invalid or expired password reset token");

  const hashedPass = await bcrypt.hash(
    password,
    Number(process.env.BCRYPT_SALT),
  );
  await UserModel.updateOne(
    { _id: userId },
    { $set: { password: hashedPass } },
    { new: true },
  );

  const user = await UserModel.findById({ _id: userId });

  sendEmail(
    user.email,
    process.env.SUCCESSFULLY_RESET_MESSAGE,
    { name: user.name, link: "" },
    res,
  );

  await passwordResetToken.deleteOne();
  return { message: "Password reset successfully" };
};
