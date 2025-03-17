import { NextFunction, Response, Request } from "express";

export const catchAsync =
  (fn: (req: Request, res: Response, next: NextFunction) => any) =>
  (req: Request, res: Response, next: NextFunction) => {
    new Promise(fn(req, res, next)).catch(next);
  };
