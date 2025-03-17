import { Response } from "express";
import { isDev } from "../../utils/isDev";
import { iFlowError } from "../../../types";

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
    if (status) {
      this.status = status;
    } else {
      if (!this.status) this.status = 500;
    }

    if (message) {
      this.message = message;
    } else {
      if (!this.message) this.message = "Internal server error";
    }

    if (stack) {
      this.stack = stack;
    } else {
      if (!this.stack) this.stack = null;
    }

    if (isDev()) console.log(this.stack);
    return this.res.status(+this.status).json({
      success: +this.status < 400,
      message: this.message,
    });
  }
}
export default FlowError;
