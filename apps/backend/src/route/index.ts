import express from "express";
import { app } from "../app";
import FlowResponse from "@flowlink/exres/FlowResponse";

const router = express.Router();

export const setupRoutes = () => {
  // default route
  app.get("/api", (req, res, next) => {
    const resp = new FlowResponse({ res });
    resp.send({ status: 200, message: "Welcome to Flowlink API" });
  });
  // other imp routes
};
