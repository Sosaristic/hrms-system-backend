import { ZodError } from "zod";
import { Response } from "express";
import CustomError from "../utils/error/CustomError";
type ErrorType = CustomError & ZodError;
export declare class ErrorValidator {
    private res;
    private error;
    constructor(res: Response, error: ErrorType);
    zodValidator(): Response<any, Record<string, any>>;
    customValidator(): Response<any, Record<string, any>>;
    mongoUniqueValidator(): Response<any, Record<string, any>>;
    mongoCastValidator(): Response<any, Record<string, any>>;
    largePayload(): Response<any, Record<string, any>>;
}
export {};
