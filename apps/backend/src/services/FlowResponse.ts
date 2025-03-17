import { Response } from "express";
import { iFlowResponse } from "../../types";

class FlowResponse {
  status: number;
  message: string;
  data: any;
  res: Response;

  constructor({ res, status, message, data }: iFlowResponse) {
    if (!res) throw new Error("Response object is required.");
    this.res = res;
    this.status = status || 200;
    this.message = message || "Done";
    this.data = data || null;
  }
  send({ status, message, data }: Partial<iFlowResponse> = {}) {
    return this.res.status(status || this.status).json({
      success: status ? status < 400 : +this.status < 400,
      message: message || this.message,
      data: data || this.data,
    });
  }
}
export default FlowResponse;
