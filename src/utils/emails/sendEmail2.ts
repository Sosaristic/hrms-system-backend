import nodemailer from "nodemailer";
import CustomError from "../error/CustomError";
import dotenv from "dotenv";

dotenv.config();
export interface EmailConfigProp {
  service: string;
  host: string;
  port: number;
  secure: boolean;
  debug: boolean;
  // logger: boolean;
  auth: {
    user: string;
    pass: string;
  };
  tls: {
    rejectUnauthorized: boolean;
  };
}

const nodemailerConfig: EmailConfigProp = {
  service: process.env.SERVICE,
  host: process.env.GMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: false,
  debug: true,
  // logger: true,
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
};

type EmailType = {
  email: string;
  subject: string;
  html: string;
};

export const sendEmail = ({ email, subject, html }: EmailType) => {
  try {
    const transporter = nodemailer.createTransport(nodemailerConfig);
    transporter.sendMail({
      from: process.env.EMAIL_ADDRESS,
      to: email,
      subject: subject,
      html: html,
    });
  } catch (error) {
    console.log({ error });
    throw new CustomError("Email failed to send", 400);
  }
};
