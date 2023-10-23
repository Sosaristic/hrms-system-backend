import { Request, Response } from "express";
// import { UserModel } from "../models/users.model";
// import { comparePassword, createJwt, verifyJwt } from "../utils/helpers";
// import CustomError from "../utils/error/CustomError";
import { tryCatch } from "../utils/tryCatch";
import { addEmployeeSchema } from "../validators/employee.validators";
import { CandidateModel } from "../models/candidate.model";
import CustomError from "../utils/error/CustomError";
import { EmployeeModel } from "../models/employee.model";
import { UserModel } from "../models/users.model";
import { hashPassword, uploadToCloudinary } from "../utils/helpers";

export const registerEmployee = tryCatch(
  async (req: Request, res: Response) => {
    const { candidateId, gender, image, password } = addEmployeeSchema.parse(
      req.body,
    );
    const candidate = await CandidateModel.findOne({
      _id: candidateId,
    }).populate("job job.department");
    if (!candidate.$isValid) {
      throw new CustomError("Candidate not found", 404);
    }
    const passwordHash = await hashPassword(password);
    const user = await UserModel.create({
      name: candidate.name,
      password: passwordHash,
      email: candidate.email,
      emailVerified: true,
    });

    const imageFile = await uploadToCloudinary({
      file: image,
      folder: "HRMS/Images",
    });

    await EmployeeModel.create({
      user: user,
      gender: gender,
      imageUrl: imageFile.secure_url,
      salary: candidate.job.salary,
      phoneNumber: candidate.phoneNumber,
      job: candidate.job,
      department: candidate.job.department,
    });

    return res.status(201).json({
      status: "success",
      message: "Account Successfully Created",
    });
  },
);

export const allEmployee = tryCatch(async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const employees = await EmployeeModel.find({})
    .populate({
      path: "user job department",
    })
    .skip((page - 1) * limit)
    .limit(limit)
    .exec();
  return res.status(200).json({ status: "success", data: employees });
});

export const singleEmployee = tryCatch(async (req: Request, res: Response) => {
  const id = req.params.id;
  const employee = await EmployeeModel.findOne({ _id: id })
    .populate({
      path: "user job department",
    })
    .exec();
  return res.status(200).json({ status: "success", data: employee });
});
