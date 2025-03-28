import { Response } from "express";
import { isDev } from "@flowlink/utils";
import { iFlowError } from "../types";

class FlowError {
  status: number;
  message: string;
  stack: string | null;
  res: Response;

  constructor({ res, status, message, stack }: iFlowError) {
    if (!res) {
      throw new Error("Response object is required");
    }
    this.res = res;
    this.status = status || 500;
    this.message = message || "Internal server error";
    this.stack = stack || null;
  }

  send({ status, message, stack }: Partial<iFlowError> = {}) {
    if (stack && isDev()) console.log(this.stack);

    return this.res.status(status || this.status).json({
      success: status ? status < 400 : this.status < 400,
      message: message || this.message,
    });
  }
}
export default FlowError;
