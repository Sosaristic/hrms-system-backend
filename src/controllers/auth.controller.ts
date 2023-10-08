import { Request, Response } from "express";
import { UserModel } from "../models/users.model";
import { comparePassword, createJwt, verifyJwt } from "../utils/helpers";
import CustomError from "../utils/error/CustomError";
import { tryCatch } from "../utils/tryCatch";
import {
  emailBodySchema,
  loginBodySchema,
  passwordResetSchema,
} from "../validators/auth.validators";
import { sendEmail } from "../utils/emails/sendEmail2";
import {
  resetPasswordTemplate,
  resetSuccessTemplate,
} from "../utils/emails/emailTemplates";
import { hashPassword } from "../utils/helpers/index";

// login

export const authLogin = tryCatch(async (req: Request, res: Response) => {
  const data = loginBodySchema.parse(req.body);
  const { email, password } = data;
  const user = await UserModel.findOne({ email }).select("+password");
  if (!user) {
    throw new CustomError("Invalid credentials", 400);
  }
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new CustomError("Invalid credentials", 400);
  }
  if (!user.emailVerified && isMatch) {
    return res.status(203).json({
      status: "pending",
      message: "Kindly Confirm your email to activate your account",
    });
  }
  const accessToken = createJwt(
    {
      userId: user._id,
      role: user.role,
    },
    { expiresIn: 15 * 60 } //expire in 15 minute
  );

  const refreshToken = createJwt(
    {
      userId: user._id,
      role: user.role,
    },
    { expiresIn: 24 * 60 * 60 }
  ); //expire in 1day

  res.cookie("refresh", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000,
  });
  const userData = {
    name: user.name,
    email: user.email,
    emailVerified: user.emailVerified,
    role: user.role,
    token: accessToken,
  };
  user.refreshToken = refreshToken;
  await user.save();
  return res.status(201).json({ status: "success", user: userData });
});

//
export const getToken = tryCatch(async (req: Request, res: Response) => {
  const refresh = req.cookies["resfresh"];
  const decoded = verifyJwt(refresh);
  const user = await UserModel.findOne({ _id: decoded.userId })
    .select("+refreshToken")
    .lean();
  if (!user.refreshToken === refresh) {
    throw new CustomError("Not Authorized", 400);
  }
  const accessToken = createJwt(
    {
      userId: user._id,
      role: user.role,
    },
    { expiresIn: 15 * 60 } //expire in 15 minute
  );
  return res.status(200).json({ token: accessToken });
});

export const forgetPassword = tryCatch(async (req: Request, res: Response) => {
  const data = emailBodySchema.parse(req.body);
  const { email } = data;
  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new CustomError("Invalid Credentials", 400);
  }

  const token = createJwt(
    {
      userId: user._id,
    },
    { expiresIn: 10 * 60 }
  );

  const link = `${process.env.CLIENT_URL}/reset-password/?token=${token}`;
  const subject = "Password Reset Request";
  const duration = "10 minutes";
  const html = resetPasswordTemplate({ name: user.name, link, duration });

  sendEmail({ email: user.email, subject, html });

  return res.status(200).json({
    status: "success",
    message:
      "Password email reset sent, Kindly check your email to reset your password",
  });
});

export const confirmPasswordReset = tryCatch(
  async (req: Request, res: Response) => {
    const tokenParams = req.params.token;
    const { token, password } = passwordResetSchema.parse({
      token: tokenParams,
      ...req.body,
    });

    const decode = verifyJwt(token);
    const passwordHash = await hashPassword(password);

    const user = await UserModel.findOne({ _id: decode.userId });
    if (!user) {
      throw new CustomError("User not found", 400);
    }
    user.password = passwordHash;
    user.save();
    const html = resetSuccessTemplate({ name: user.name });
    const subject = "Password Reset Successful";
    sendEmail({ email: user.email, subject, html });
    return res
      .status(201)
      .json({ status: "success", message: "Password Successfully Reset" });
  }
);
