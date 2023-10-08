import { ZodError } from "zod";
import { Response } from "express";
import CustomError from "../utils/error/CustomError";

type ErrorType = CustomError & ZodError;
export class ErrorValidator {
  constructor(
    private res: Response,
    private error: ErrorType
  ) {
    this.res = res;
    this.error = error;
  }
  zodValidator() {
    const { errors } = this.error;
    const details = errors.map((error) => ({
      field: error.path[0],
      message: error.message,
    }));
    return this.res
      .status(400)
      .json({ status: "invalid_input", details, statusCode: 400 });
  }
  customValidator() {
    const error = this.error;
    const message = error.message;
    const statusCode = error.statusCode;
    return this.res.status(error.statusCode).json({
      status: error.status,
      details: { message },
      statusCode,
    });
  }
}
