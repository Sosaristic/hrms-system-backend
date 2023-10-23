import { Request, Response, NextFunction } from "express";
export declare const tryCatch: (controller: (req: Request, res: Response) => Promise<Response>) => (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
