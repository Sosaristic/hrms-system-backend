import { tryCatch } from "../utils/tryCatch";
import { Request, Response } from "express";
import { CandidateModel } from "../models/candidate.model";
import CustomError from "../utils/error/CustomError";
import { addCandidateSchema } from "../validators/candidate.validators";
import { sendEmail } from "../utils/emails/sendEmail2";
import {
  offerLetterTemplate,
  rejectionLetterTemplate,
} from "../utils/emails/emailTemplates";

export const addCandidate = tryCatch(async (req: Request, res: Response) => {
  const data = addCandidateSchema.parse(req.body);
  const { name, email, jobTitle, resume, phoneNumber } = data;
  const candidate = await CandidateModel.create({
    name,
    email,
    jobTitle,
    resume,
    phoneNumber,
  });
  if (!candidate) {
    throw new CustomError(
      "Sorry, Error occur why registering a candidate",
      400
    );
  }
  return res.status(201).json({
    status: "success",
    message: "Candidate registered successfully",
    data: candidate,
  });
});

export const allCandidate = tryCatch(async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const candidates = await CandidateModel.find({})
    .skip((page - 1) * limit)
    .limit(limit)
    .exec();
  return res.status(200).json({ status: "success", data: candidates });
});

export const singleCandidate = tryCatch(async (req: Request, res: Response) => {
  const id = req.params.id;
  const candidate = await CandidateModel.findOne({ _id: id });
  if (!candidate) {
    throw new CustomError("Candidate not found", 400);
  }
  return res.status(200).json({ status: "success", data: candidate });
});

export const acceptCandidate = tryCatch(async (req: Request, res: Response) => {
  const id = req.params.id;

  const candidate = await CandidateModel.findOneAndUpdate(
    { _id: id },
    { $set: { candidateStatus: "SELECTED" } },
    { new: true }
  ).exec();
  if (!candidate) {
    throw new CustomError("Candidate not found", 400);
  }
  const subject = "Offer Letter";
  const link = `${process.env.CLIENT_URL}/employee/register/?id=${candidate._id}`;
  const html = offerLetterTemplate({
    name: candidate.name,
    jobTitle: candidate.jobTitle,
    companyEmail: process.env.EMAIL_ADDRESS,
    companyName: "HRMS",
    registerLink: link,
  });
  sendEmail({ email: candidate.email, subject, html });

  return res.status(201).json({
    status: "success",
    message: `Candidate ${candidate.candidateStatus.toLocaleLowerCase()} successfully`,
    data: candidate,
  });
});

export const rejectCandidate = tryCatch(async (req: Request, res: Response) => {
  const id = req.params.id;

  const candidate = await CandidateModel.findOneAndUpdate(
    { _id: id },
    { $set: { candidateStatus: "REJECTED" } },
    { new: true }
  ).exec();
  if (!candidate) {
    throw new CustomError("Candidate not found", 400);
  }
  const subject = "Offer Letter";
  const html = rejectionLetterTemplate({
    name: candidate.name,
    jobTitle: candidate.jobTitle,
    companyName: "HRMS",
  });
  sendEmail({ email: candidate.email, subject, html });

  return res.status(201).json({
    status: "success",
    message: `Candidate ${candidate.candidateStatus.toLocaleLowerCase()} successfully`,
    data: candidate,
  });
});

export const deleteCandidate = tryCatch(async (req: Request, res: Response) => {
  const id = req.params.id;

  const candidate = await CandidateModel.findOneAndDelete({ _id: id });
  if (!candidate) {
    throw new CustomError("Candidate not found", 400);
  }
  return res.status(201).json({
    status: "success",
    message: `Candidate deleted successfully`,
  });
});
