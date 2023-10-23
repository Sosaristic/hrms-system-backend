import { Request, Response, NextFunction } from "express";
import { ErrorValidator } from "../validators/ErrorValidators";
import CustomError from "../utils/error/CustomError";
import { ZodError } from "zod";
import { MongoError } from "mongodb";

// const zodValidatorError = (error: ZodError) => {};
type ErrorType = CustomError & ZodError & MongoError;

const errorController = (
  error: ErrorType,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const validator = new ErrorValidator(res, error);
  next;
  if (error.name === "ZodError") {
    return validator.zodValidator();
  }
  if (error.isOperational) {
    return validator.customValidator();
  }
  if (error.code === 11000) {
    return validator.mongoUniqueValidator();
  }
  if (error.name === "CastError") {
    return validator.mongoCastValidator();
  }
  if (error.name === "PayloadTooLargeError") {
    return validator.largePayload();
  } else {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default errorController;
