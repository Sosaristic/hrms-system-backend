import { Request, Response, NextFunction } from "express";

export const tryCatch =
  (controller: (req: Request, res: Response) => Promise<Response>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await controller(req, res);
    } catch (error) {
      return next(error);
    }
  };
