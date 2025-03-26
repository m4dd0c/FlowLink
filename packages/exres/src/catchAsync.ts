import { NextFunction, Response, Request } from "express";

const catchAsync =
  (fn: (req: Request, res: Response, next: NextFunction) => any) =>
  (req: Request, res: Response, next: NextFunction) => {
    new Promise(fn(req, res, next)).catch(next);
  };
export default catchAsync;
