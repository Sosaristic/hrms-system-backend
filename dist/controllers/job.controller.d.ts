/// <reference types="qs" />
import { Request, Response } from "express";
export declare const addJob: (
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
export declare const allJobs: (
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
export declare const singleJob: (
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
export declare const changeJobStatus: (
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
export declare const deleteJob: (
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
