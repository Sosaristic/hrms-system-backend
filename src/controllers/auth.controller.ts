import { Request, Response } from "express";
import { UserModel } from "../models/users.model";
import { comparePassword, createJwt, verifyJwt } from "../utils/helpers";
import CustomError from "../utils/error/CustomError";
import { tryCatch } from "../utils/tryCatch";
import {
  emailBodySchema,
  loginBodySchema,
  passwordResetSchema,
  registerBodySchema,
} from "../validators/auth.validators";
import { sendEmail } from "../utils/emails/sendEmail2";
import {
  changeToAdminTemplate,
  resetPasswordTemplate,
  resetSuccessTemplate,
} from "../utils/emails/emailTemplates";
import { hashPassword } from "../utils/helpers/index";

export const testRoute = (req: Request, res: Response) => {
  return res.json({ message: "test...." });
};

// login
export const authRegister = tryCatch(async (req: Request, res: Response) => {
  const { name, email, password } = registerBodySchema.parse(req.body);

  // Check if user already exists
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Hash password
  const passwordHash = await hashPassword(password);

  // Create user
  const user = await UserModel.create({
    name,
    email,
    password: passwordHash,
  });

  const token = createJwt(
    {
      userId: user._id,
    },
    { expiresIn: 10 * 60 },
  );
  // link to confirm
  const link = `${process.env.SERVER_URL}/api/v1/auth/confirm/admin?token=${token}`;
  const subject = "Change to Admin";
  const html = changeToAdminTemplate({ name: user.name, link });

  sendEmail({ email: user.email, subject, html });

  res.status(201).json({ message: "User created successfully" });
});

export const confirmAdmin = tryCatch(async (req: Request, res: Response) => {
  const token = String(req.query.token);

  const decode = verifyJwt(token);

  const user = await UserModel.findOneAndUpdate(
    { _id: decode.userId },
    {
      $set: { role: "ADMIN", emailVerified: true },
    },
  );
  return res.status(201).send(`<h2>Hi ${user.name},</h2>
          <p>Your account change to admin is successful</p>
          <p>Kindly click below to login</p>
          <a href="${process.env.CLIENT_URL}/login" style="display: inline-block; background-color: #007bff; color: #fff; margin-bottom: 0.5rem; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Login</a>
    `);
});

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
    { expiresIn: 15 * 60 }, //expire in 15 minute
  );

  const refreshToken = createJwt(
    {
      userId: user._id,
      role: user.role,
    },
    { expiresIn: 24 * 60 * 60 },
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
    accessToken,
  };
  user.refreshToken = refreshToken;
  await user.save();
  return res.status(201).json({ status: "success", user: userData });
});

//
export const getToken = tryCatch(async (req: Request, res: Response) => {
  const refresh = req.cookies["refresh"];
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
    { expiresIn: 15 * 60 }, //expire in 15 minute
  );
  return res.status(200).json({ accessToken });
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
    { expiresIn: 10 * 60 },
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
  },
);
