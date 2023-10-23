import { Request, Response, NextFunction } from "express";
import CustomError from "../utils/error/CustomError";
import { ZodError } from "zod";
import { MongoError } from "mongodb";
type ErrorType = CustomError & ZodError & MongoError;
declare const errorController: (
  error: ErrorType,
  req: Request,
  res: Response,
  next: NextFunction,
) => Response<any, Record<string, any>>;
export default errorController;
