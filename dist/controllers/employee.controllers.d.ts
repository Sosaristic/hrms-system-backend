/// <reference types="qs" />
import { Request, Response } from "express";
export declare const registerEmployee: (
  req: Request<
    import("express-serve-static-core").ParamsDictionary,
    any,
    any,
    import("qs").ParsedQs,
    Record<string, any>
  >,
  res: Response<any, Record<string, any>>,
  next: import("express").NextFunction,
) => Promise<void | Response<any, Record<string, any>>>;
export declare const allEmployee: (
  req: Request<
    import("express-serve-static-core").ParamsDictionary,
    any,
    any,
    import("qs").ParsedQs,
    Record<string, any>
  >,
  res: Response<any, Record<string, any>>,
  next: import("express").NextFunction,
) => Promise<void | Response<any, Record<string, any>>>;
export declare const singleEmployee: (
  req: Request<
    import("express-serve-static-core").ParamsDictionary,
    any,
    any,
    import("qs").ParsedQs,
    Record<string, any>
  >,
  res: Response<any, Record<string, any>>,
  next: import("express").NextFunction,
) => Promise<void | Response<any, Record<string, any>>>;
