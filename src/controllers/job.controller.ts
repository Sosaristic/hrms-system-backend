import { Request, Response } from "express";
import { tryCatch } from "../utils/tryCatch";
import { addJobSchema, jobStatusSchema } from "../validators/job.validators";
import { DepartmentModel } from "../models/department.model";
import { JobModel } from "../models/job.model";
import CustomError from "../utils/error/CustomError";

export const addJob = tryCatch(async (req: Request, res: Response) => {
  const data = addJobSchema.parse(req.body);
  const { department, title, jobType, description, salary } = data;
  const dept = department.toLowerCase();
  const jobDepartment = await DepartmentModel.findOne({ name: dept });
  if (!jobDepartment) {
    throw new CustomError(
      "Kindly provide a valid department for this job",
      400,
    );
  }
  const job = await JobModel.create({
    title,
    jobType,
    description,
    salary,
    department: jobDepartment,
  });

  return res.status(201).json({
    status: "success",
    message: "Job is added successfully",
    data: job,
  });
});

export const allJobs = tryCatch(async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const jobs = await JobModel.find({})
    .populate("department")
    .skip((page - 1) * limit)
    .limit(limit)
    .exec();
  if (!jobs) {
    throw new CustomError("Sorry, Jobs not found", 404);
  }
  return res.status(200).json({ status: "success", data: jobs });
});

export const singleJob = tryCatch(async (req: Request, res: Response) => {
  const id = req.params.id;

  const job = await JobModel.findOne({ _id: id }).populate("department");
  if (!job) {
    throw new CustomError("Sorry, Job not found", 404);
  }
  return res.status(200).json({ status: "success", data: job });
});

export const changeJobStatus = tryCatch(async (req: Request, res: Response) => {
  const id = req.params.id;
  const { status } = jobStatusSchema.parse(req.body);
  const job = await JobModel.findOneAndUpdate(
    { _id: id },
    { $set: { status: status } },
    { new: true },
  ).exec();
  if (!job) {
    throw new CustomError("Sorry, Error Occur while updating job Status", 404);
  }
  return res.status(201).json({
    status: "success",
    message: "Job is deleted successfully",
  });
});

export const deleteJob = tryCatch(async (req: Request, res: Response) => {
  const id = req.params.id;
  const job = await JobModel.deleteOne({ _id: id });
  if (!job) {
    throw new CustomError("Sorry, Job not found", 404);
  }
  return res.status(201).json({
    status: "success",
    message: "Job is deletedd successfully",
  });
});
