import { Response } from "express";

export interface iFlowError {
  res: Response;
  status?: number;
  message?: string;
  stack?: string | null;
}

export interface iFlowResponse {
  res: Response;
  status?: number;
  message?: string;
  data?: any;
}
