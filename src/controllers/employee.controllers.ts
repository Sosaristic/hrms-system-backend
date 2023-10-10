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
import { hashPassword } from "../utils/helpers";

export const registerEmployee = tryCatch(
  async (req: Request, res: Response) => {
    const { candidateId, gender, password } = addEmployeeSchema.parse(req.body);
    const candidate = await CandidateModel.findOne({ _id: candidateId });
    if (!candidate.$isValid) {
      throw new CustomError("Candidate not found", 404);
    }
    const passwordHash = await hashPassword(password);
    const user = await UserModel.create({
      name: candidate.name,
      password: passwordHash,
      email: candidate.email,
    });
    const employee = await EmployeeModel.create({
      user: user,
      gender: gender,
    });

    return res.status(201).json({
      status: "success",
      message: "Account Successfully Created",
      data: employee,
    });
  }
);

export const allEmployee = tryCatch(async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const employees = await EmployeeModel.find({})
    .skip((page - 1) * limit)
    .limit(limit)
    .exec();
  return res.status(200).json({ status: "success", data: employees });
});
