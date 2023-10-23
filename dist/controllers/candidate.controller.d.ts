/// <reference types="qs" />
import { Request, Response } from "express";
export declare const addCandidate: (
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
export declare const allCandidate: (
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
export declare const singleCandidate: (
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
export declare const acceptCandidate: (
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
export declare const rejectCandidate: (
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
export declare const deleteCandidate: (
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
