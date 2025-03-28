import { Response } from "express";
import { iFlowResponse } from "../types";
import { isDev } from "@flowlink/utils";
import { saveSession } from "./jwt";

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
  send({
    status,
    message,
    data,
    auth,
  }: Partial<iFlowResponse> & { auth?: string } = {}) {
    if (auth) {
      const token = saveSession(auth);
      return this.res
        .cookie("token", token, {
          httpOnly: true,
          secure: isDev() ? false : true,
          sameSite: isDev() ? "lax" : "none",
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        })
        .status(status || this.status)
        .json({
          success: status ? status < 400 : +this.status < 400,
          message: message || this.message,
          data: data || this.data,
        });
    } else {
      return this.res.status(status || this.status).json({
        success: status ? status < 400 : +this.status < 400,
        message: message || this.message,
        data: data || this.data,
      });
    }
  }
}
export default FlowResponse;
