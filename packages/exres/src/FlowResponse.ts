import { Response } from "express";
import { iFlowResponse } from "../types";
import { isDev } from "@flowlink/utils";
import { saveSession } from "./jwt";
// import redis from "@flowlink/redis";

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

  // Response sender fn for un-authentication
  unauthenticate() {
    // checking if all required data is provided
    if (!this.res) throw new Error("Response object is required.");

    // generating JWT token for the user and saving to cookies
    this.res.cookie("token", null, {
      httpOnly: true,
      secure: isDev() ? false : true,
      sameSite: isDev() ? "lax" : "none",
      expires: new Date(Date.now()),
    });

    // if (id) await redis.del(`session:${id}`);
    // sending response
    this.send({
      status: this.status,
      message: this.message,
      data: this.data,
    });
  }

  // Response sender fn for authentication
  authenticate({ auth }: Partial<iFlowResponse> & { auth: string }) {
    // checking if all required data is provided
    if (!auth) throw new Error("Auth data is required for authentication.");
    if (!this.res) throw new Error("Response object is required.");

    // generating JWT token for the user and saving to cookies
    const token = saveSession(auth);
    this.res.cookie("token", token, {
      httpOnly: true,
      secure: isDev() ? false : true,
      sameSite: isDev() ? "lax" : "none",
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });

    // sending response
    this.send({
      status: this.status,
      message: this.message,
      data: this.data,
    });
  }

  // General purpose Response sender fn
  send({ status, message, data }: Partial<iFlowResponse> = {}) {
    // Sending repsonse
    return this.res.status(status || this.status).json({
      success: status ? status < 400 : +this.status < 400,
      message: message || this.message,
      data: data || this.data,
    });
  }
}
export default FlowResponse;
