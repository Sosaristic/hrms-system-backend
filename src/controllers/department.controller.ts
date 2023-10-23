import { Request, Response } from "express";
import { tryCatch } from "../utils/tryCatch";
import { DepartmentModel } from "../models/department.model";
import CustomError from "../utils/error/CustomError";
import { addDepartmentSchema } from "../validators/department.validators";
import { EmployeeModel } from "../models/employee.model";

export const addDepartment = tryCatch(async (req: Request, res: Response) => {
  const data = addDepartmentSchema.parse(req.body);
  if (!data) {
    throw new CustomError("In valid data", 400);
  }
  const { name } = data;
  const deptName = name.toLowerCase();
  const department = await DepartmentModel.create({
    name: deptName,
  });
  if (!department) {
    throw new CustomError("Department already exist", 400);
  }

  return res.status(201).json({
    status: "success",
    message: "Department registered Successfully",
    data: department,
  });
});

export const allDepartment = tryCatch(async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const departments = await DepartmentModel.find({})
    .skip((page - 1) * limit)
    .limit(limit)
    .exec();
  if (!departments) {
    throw new CustomError("Sorry, No data found", 404);
  }
  return res.status(200).json({ status: "success", data: departments });
});

export const editDepartment = tryCatch(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = addDepartmentSchema.parse(req.body);
  const { name, departmentHead } = data;
  const employee = await EmployeeModel.findOne({ "user.name": departmentHead });
  const department = await DepartmentModel.findOneAndUpdate(
    { _id: id },
    { $set: { name: name, departmentHead: employee || "" } },
    { new: true },
  );
  if (!department) {
    throw new CustomError("Sorry, No data found", 404);
  }
  return res.status(200).json({
    status: "success",
    message: "Department successfully updated",
    data: department,
  });
});

export const deleteDepartment = tryCatch(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const department = await DepartmentModel.deleteOne({ _id: id });
    if (!department) {
      throw new CustomError("Sorry, Department not found", 404);
    }
    return res.status(200).json({
      status: "success",
      message: "Department  successfully deleted",
    });
  },
);
