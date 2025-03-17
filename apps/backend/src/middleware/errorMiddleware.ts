import { Request, Response } from "express";
import { isDev } from "../utils/isDev";
import FlowError from "../services/ErrorHandler/FlowError";

export const errorMiddleware = (err: any, req: Request, res: Response) => {
  const flowError = new FlowError({ res });
  try {
    if (err.code && err.code.startsWith("P"))
      flowError.message = "POSTGRES_ERR: " + err.message;
    else flowError.message = err.message || "Internal server error";

    if (isDev()) {
      //TODO: save logs into capped collection
    }

    flowError.send({ status: err.status, stack: err.stack });
  } catch (error) {
    flowError.send({
      status: 500,
      stack: "Something went bad, Please contact support.",
    });
  }
};
