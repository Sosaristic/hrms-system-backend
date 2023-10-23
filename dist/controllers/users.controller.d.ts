/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { UserType } from "../models/users.model";
import { Request, Response } from "express";
export declare const register: (
  req: Request,
  res: Response,
) => Promise<Response<any, Record<string, any>>>;
export declare const login: (
  req: Request,
  res: Response,
) => Promise<Response<any, Record<string, any>>>;
export declare const forgotPassword: (
  req: Request,
  res: Response,
) => Promise<Response<any, Record<string, any>>>;
export declare const logout: (req: Request, res: Response) => Promise<void>;
export declare const getUsers: () => import("mongoose").Query<
  (import("mongoose").Document<unknown, {}, UserType> &
    UserType & {
      _id: import("mongoose").Types.ObjectId;
    })[],
  import("mongoose").Document<unknown, {}, UserType> &
    UserType & {
      _id: import("mongoose").Types.ObjectId;
    },
  {},
  UserType,
  "find"
>;
export declare const getUsersByEmail: (
  email: string,
) => import("mongoose").Query<
  import("mongoose").Document<unknown, {}, UserType> &
    UserType & {
      _id: import("mongoose").Types.ObjectId;
    },
  import("mongoose").Document<unknown, {}, UserType> &
    UserType & {
      _id: import("mongoose").Types.ObjectId;
    },
  {},
  UserType,
  "findOne"
>;
export declare const getUsersBySessionToken: (
  sessionToken: string,
) => import("mongoose").Query<
  import("mongoose").Document<unknown, {}, UserType> &
    UserType & {
      _id: import("mongoose").Types.ObjectId;
    },
  import("mongoose").Document<unknown, {}, UserType> &
    UserType & {
      _id: import("mongoose").Types.ObjectId;
    },
  {},
  UserType,
  "findOne"
>;
