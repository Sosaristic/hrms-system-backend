/// <reference types="qs" />
import { Request, Response } from "express";
export declare const testRoute: (
  req: Request,
  res: Response,
) => Response<any, Record<string, any>>;
export declare const authRegister: (
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
export declare const confirmAdmin: (
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
export declare const authLogin: (
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
export declare const getToken: (
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
export declare const forgetPassword: (
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
export declare const confirmPasswordReset: (
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
