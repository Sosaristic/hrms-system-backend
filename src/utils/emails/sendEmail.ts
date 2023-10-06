import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { Response } from "express";

export interface EmailConfigProp {
  service: string;
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

export interface UserLink {
  name: string;
  link: string;
}

dotenv.config();
// const nodemailerConfig: EmailConfigProp = {
//   host: process.env.EMAIL_HOST,
//   port: 587,
//   auth: {
//     user: process.env.SMTP_USERNAME,
//     pass: process.env.SMTP_PASSWORD,
//   },
// };

const nodemailerConfig: EmailConfigProp = {
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
};

export const sendEmail = async (
  email: string,
  subject: string,
  payload: UserLink,
  res: Response,
) => {
  try {
    const transporter = nodemailer.createTransport(nodemailerConfig);

    let html = "";

    if (subject == process.env.SUCCESSFULLY_RESET_MESSAGE) {
      html = `
    <p>Hello ${payload.name},</p>
        <p>You have Successfully reset your password</p>
    
        <p>If you did not request this, Kindly message our customer services.</p>
        
    `;
    } else {
      html = `
    <p>Hello ${payload.name},</p>
        <p>You have requested to reset your password. Please click the link below to reset your password:</p>
        
        <a href="${payload.link}" style="display: inline-block; background-color: #007bff; color: #fff; margin-bottom: 0.5rem; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
        <br/>

        <p>if the reset button does not work here is the direct link</>
        <a href="${payload.link}">${payload.link}</a>
        <p>If you did not request this, please ignore this email.</p>
    `;
    }

    transporter.sendMail({
      from: process.env.EMAIL_ADDRESS,
      to: email,
      subject: subject,
      html: html,
    }),
      (error) => {
        if (error) {
          return error;
        } else {
          return res.status(200).json({ success: true });
        }
      };
  } catch (error) {
    return error;
  }
};
